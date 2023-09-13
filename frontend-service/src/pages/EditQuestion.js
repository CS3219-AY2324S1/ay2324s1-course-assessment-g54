import axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CategoryChips from "../components/CategoryChips";
import MarkDownEditor from "../components/MarkdownEditor";
import NavBar from "../components/NavBar";
import SelectChip from "../components/SelectChip";



import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Card, CardContent} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";



const EditQuestion = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState(null);
  const [questionTitle, setQuestionTitle] = useState("  ");

  useEffect(() => {
    const getQuestion = async () => {
      const url = `${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/questions/${id}`;
      const response = await axios.get(url);
      const question = response.data;
      if (!question.question_id) return navigate("/questions");
      setQuestion(question);
      setQuestionTitle(question.title);
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

  //console.log(question.description);

  return (
    <>
      <NavBar />
      <Box height="calc(100vh - 64px)" width="100vw" bgcolor="whitesmoke">
        <Box height="100%" display="flex">
          <Stack height="100%" width="100%" spacing={1} border="1px dashed green">
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Tooltip title="Back to questions" placement="top" arrow>
                <IconButton onClick={() => navigate(`/questions/${id}`)}>
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
                      <TextField fullWidth id="outlined-basic" label="title" defaultValue={questionTitle} variant="outlined" onChange={(e) => setQuestionTitle(e.target.value)} />
                    </CardContent>
                  </Card>
                  <Card
                    variant="outlined"
                    textOverflow="ellipsis"
                    sx={{ flexGrow: 1 }}
                    padding={1}
                  >
                    <CardContent>
                      <SelectChip currentComplexity={question.complexity} />
                    </CardContent>
                  </Card>
                  <Card
                    variant="outlined"
                    textOverflow="ellipsis"
                    sx={{ flexGrow: 1 }}
                    padding={1}
                  >
                    <CardContent>
                      <CategoryChips categories={question.categories} complexityColor={getDifficultyChipColor(question.complexity)} />
                    </CardContent>
                  </Card>
                </Stack>
              </Box>
              <Box width="50%" height="100%" padding={1} overflow="scroll">
                <MarkDownEditor description={question.description} />
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default EditQuestion;
