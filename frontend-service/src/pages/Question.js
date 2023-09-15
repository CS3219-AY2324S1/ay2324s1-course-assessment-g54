import axios from "axios";
import * as DOMPurify from "dompurify";
import * as marked from "marked";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import NavBar from "../components/NavBar";

import Editor from "@monaco-editor/react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

marked.use({ breaks: true, gfm: true, silent: true });

const Question = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const getQuestion = async () => {
      const url = `${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/questions/${id}`;
      const token = window.localStorage.getItem("token");
      const response = await axios.get(url, {
        headers: { Authorization: token },
      });
      const question = response.data;
      if (!question.question_id) return navigate("/questions");
      setQuestion(question);
      setIsLoading(false);
    };

    getQuestion();
  }, [id, navigate]);

  if (isLoading) return <LinearProgress variant="indeterminate" />;

  const getDifficultyChipColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "success";
      case "medium":
        return "warning";
      case "hard":
        return "error";
      default:
        return "primary";
    }
  };

  return (
    <>
      <NavBar />
      <Box height="calc(100vh - 64px)" width="100vw" bgcolor="whitesmoke">
        <Box height="100%" display="flex">
          <Box width="50%" height="100%" padding={1}>
            <Stack height="100%" spacing={1}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Tooltip title="Back to questions" placement="top" arrow>
                  <IconButton onClick={() => navigate("/questions")}>
                    <ArrowBackIcon />
                  </IconButton>
                </Tooltip>
                <Typography
                  variant="h5"
                  flexGrow={1}
                  noWrap
                  textOverflow="ellipsis"
                >
                  {question.title}
                </Typography>
                <Chip
                  label={question.complexity}
                  color={getDifficultyChipColor(question.complexity)}
                  size="small"
                />
                <Tooltip title="Edit question" placement="top" arrow>
                  <IconButton onClick={() => navigate(`/questions/${id}/edit`)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Box>
                {question.categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    size="small"
                    sx={{ marginRight: 1 }}
                  />
                ))}
              </Box>
              <Card variant="outlined" sx={{ flexGrow: 1, padding: 1 }}>
                <iframe
                  height="100%"
                  width="100%"
                  style={{ border: "none" }}
                  sandbox=""
                  title="Question Description"
                  srcDoc={DOMPurify.sanitize(
                    marked.parse(question.description)
                  )}
                />
              </Card>
            </Stack>
          </Box>
          <Box width="50%" height="100%" padding={1}>
            <Paper
              sx={{ height: "100%", width: "100%", overflow: "hidden" }}
              elevation={2}
            >
              <Editor
                defaultLanguage="python"
                defaultValue="# Insert your code here"
              />
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Question;
