import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import NavBar from "../components/NavBar";

import Editor from "@monaco-editor/react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Card, CardContent } from "@mui/material";

const EditQuestion = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const getQuestion = async () => {
      const url = `${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/questions/${id}`;
      const response = await axios.get(url);
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

  console.log(question.description);

  return (
    <>
      <NavBar />
      <Box height="calc(100vh - 64px)" width="100vw" bgcolor="whitesmoke">
        <Box height="100%" display="flex">
          <Stack height="100%" width="100vw" spacing={1} border="1px dashed green">
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Tooltip title="Back to questions" placement="top" arrow>
                <IconButton onClick={() => navigate("/questions")}>
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Save question" placement="top" arrow>
                <Button variant="contained" >
                  Save
                </Button>
              </Tooltip>
            </Stack>
            <Stack height="100%" width="100%" direction="row" spacing={1} alignItems="center" border="1px dashed red">
              <Box width="50%" height="100%" padding={1}>
                <Stack spacing={1}>
                  <Card
                    variant="outlined"
                    textOverflow="ellipsis"
                    sx={{ flexGrow: 1 }}
                    padding={1}
                  >
                    <CardContent>
                      <Typography whiteSpace="pre-wrap">
                        {question.title}
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card
                    variant="outlined"
                    textOverflow="ellipsis"
                    sx={{ flexGrow: 1 }}
                    padding={1}
                  >
                    <CardContent>
                      <Typography whiteSpace="pre-wrap">
                        {question.complexity}
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card
                    variant="outlined"
                    textOverflow="ellipsis"
                    sx={{ flexGrow: 1 }}
                    padding={1}
                  >
                    <CardContent>
                      <Typography whiteSpace="pre-wrap">
                        {question.categories.map((category) => (
                          <Chip
                            key={category}
                            label={category}
                            size="small"
                            sx={{ marginRight: 1 }}
                          />
                        ))}
                      </Typography>
                    </CardContent>
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
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default EditQuestion;
