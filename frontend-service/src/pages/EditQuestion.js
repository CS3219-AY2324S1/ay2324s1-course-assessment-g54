import axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CategoryChips from "../components/CategoryChips";
import MarkDownEditor from "../components/MarkdownEditor";
import NavBar from "../components/NavBar";
import SaveBar from "../components/SaveBar";
import SelectComplexity from "../components/SelectComplexity";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

const EditQuestion = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState(null);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionComplexity, setQuestionComplexity] = useState("");
  const [questionCategory, setQuestionCategory] = useState("");
  const [questionDescription, setQuestionDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getQuestion = async () => {
      const url = `${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/questions/${id}`;
      const response = await axios.get(url);
      const question = response.data;
      if (!question.question_id) return navigate("/questions");
      setQuestion(question);
      setQuestionTitle(question.title);
      setQuestionComplexity(question.complexity);
      setQuestionCategory(question.categories);
      setQuestionDescription(question.description);
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

  const handleSaveDescription = (data) => {
    setQuestionDescription(data);
  };

  const handleSaveComplexity = (data) => {
    setQuestionComplexity(data);
  };

  const handleSaveClose = (data) => {
    setIsOpen(data);
  };

  const handleAddClick = (dataToAdd) => {
    setQuestionCategory((prevData) => {
      const newData = [...prevData, dataToAdd];
      return newData;
    });
  };

  const handleDeleteClick = (dataToDelete) => {
    setQuestionCategory((prevData) => {
      const newData = prevData.filter((item) => item !== dataToDelete);
      return newData;
    });
  };

  const handleSave = async () => {
    try {
      const url = `${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/questions/${id}`;
      console.log(url);
      const updatedQuestion = {
        ...question,
        question_id: undefined,
        title: questionTitle,
        complexity: questionComplexity,
        categories: questionCategory,
        description: questionDescription,
      };
      const saveResponse = await axios.put(url, updatedQuestion);
      setIsOpen(true);
      //navigate(`/questions/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavBar />
      <Box height="calc(100vh - 64px)" width="100%" bgcolor="whitesmoke">
        <Box height="100%" display="flex" padding={1}>
          <Stack height="100%" width="100%" spacing={1}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Tooltip title="Back to questions" placement="top" arrow>
                <IconButton onClick={() => navigate(`/questions/${id}`)}>
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
              <SaveBar onOpen={isOpen} onClose={handleSaveClose} />
              <Tooltip title="Save question" placement="top" arrow>
                <Button variant="contained" onClick={handleSave}>
                  Save
                </Button>
              </Tooltip>
            </Stack>
            <Stack
              height="100%"
              width="100%"
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <Box width="50%" height="100%" padding={1}>
                <Stack spacing={1}>
                  <Card
                    variant="outlined"
                    textOverflow="ellipsis"
                    sx={{ flexGrow: 1 }}
                    padding={1}
                  >
                    <CardContent>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="title"
                        defaultValue={questionTitle}
                        variant="outlined"
                        onChange={(e) => setQuestionTitle(e.target.value)}
                      />
                    </CardContent>
                  </Card>
                  <Card
                    variant="outlined"
                    textOverflow="ellipsis"
                    sx={{ flexGrow: 1 }}
                    padding={1}
                  >
                    <CardContent>
                      <SelectComplexity
                        currentComplexity={questionComplexity}
                        onSave={handleSaveComplexity}
                      />
                    </CardContent>
                  </Card>
                  <Card
                    variant="outlined"
                    textOverflow="ellipsis"
                    sx={{ flexGrow: 1 }}
                    padding={1}
                  >
                    <CardContent>
                      <CategoryChips
                        categories={questionCategory}
                        complexityColor={getDifficultyChipColor(
                          question.complexity
                        )}
                        onSave={handleAddClick}
                        onDelete={handleDeleteClick}
                      />
                    </CardContent>
                  </Card>
                </Stack>
              </Box>
              <Box width="50%" height="100%" padding={1} overflow="scroll">
                <MarkDownEditor
                  description={questionDescription}
                  onSave={handleSaveDescription}
                />
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default EditQuestion;
