import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AcknowledgementToast from "../components/AcknowledgementToast";

import { useUser } from "../contexts/UserContext";
import QuestionForm from "../components/QuestionForm";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import LinearProgress from "@mui/material/LinearProgress";

const EditQuestion = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useUser();
  const [isLoading, setIsLoading] = useState(true);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("info");

  const [title, setTitle] = useState("");
  const [complexity, setComplexity] = useState("");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");

  const showToast = (message, severity) => {
    setToastMessage(message);
    setToastSeverity(severity);
    setToastOpen(true);
  };
  
  useEffect(() => {
    if (!user.isMaintainer) navigate("/questions");

    const getQuestion = async () => {
      const url = `${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/questions/${id}`;
      const token = window.localStorage.getItem("token");
      const header = {
        headers: { Authorization: token },
      };
      const response = await axios.get(url, header);
      if (response.status !== 200) return navigate("/questions");
      const { categories, complexity, description, title } = response.data;
      setTitle(title);
      setComplexity(complexity);
      setCategories(categories);
      setDescription(description);
      setIsLoading(false);

      const successMessage = window.localStorage.getItem("successMessage");
      if (successMessage) {
        showToast(successMessage, "success")
      }
      window.localStorage.removeItem("successMessage");
    };

    getQuestion();
  }, [id, navigate, user.isMaintainer]);

  const handleSave = async () => {
    try {
      if (title.trim() === "") {
        showToast("Question title must be at least 3 characters.", "error")
        return;
      }
      if (description.trim().length < 3) {
        showToast("Question description must be at least 3 characters.", "error")
        return;
      }
      const url = `${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/questions/${id}`;
      const token = window.localStorage.getItem("token");
      const header = {
        headers: { Authorization: token },
      };

      const params = {
        title: title.trim(),
        complexity: complexity,
        categories: categories,
        description: description.trim()
      }
      const response = await axios.put(url, params, header);

      if (response.status === 200) {
        showToast("Question saved successfully!", "success")
      } else {
        showToast("Unable to save the question. Please try again!", "error")
      }
    } catch (error) {
      console.error(error);
      showToast("Unable to save the question. Please try again!", "error")
    }
  };

  if (isLoading) return <LinearProgress variant="indeterminate" />;

  return (
    <>
      <Box height="calc(100vh - 64px)" width="100%" bgcolor="whitesmoke">
        <Box height="100%" display="flex">
          <Stack height="100%" width="100%" spacing={1} padding={1}>
            <Box display="flex">
              <Tooltip title="Back to questions" placement="top" arrow>
                <IconButton onClick={() => navigate(`/questions`)}>
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
              <Box flexGrow={1} />
              <Tooltip title="Save question" placement="top" arrow>
                <Button variant="contained" onClick={handleSave}>
                  Save
                </Button>
              </Tooltip>
            </Box>
            <QuestionForm
              title={title}
              complexity={complexity}
              categories={categories}
              description={description}
              onTitleChange={setTitle}
              onComplexityChange={setComplexity}
              onCategoriesChange={setCategories}
              onDescriptionChange={setDescription}
            />
          </Stack>
        </Box>
      </Box>
      <AcknowledgementToast
        open={toastOpen}
        message={toastMessage}
        onClose={() => setToastOpen(false)}
        severity={toastSeverity}
      />
    </>
  );
};

export default EditQuestion;
