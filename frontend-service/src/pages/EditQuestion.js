import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AcknowledgementToast from "../components/AcknowledgementToast";

import { useUser } from "../contexts/UserContext";
import Page from "../components/Page";
import QuestionForm from "../components/QuestionForm";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
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
        showToast(successMessage, "success");
      }
      window.localStorage.removeItem("successMessage");
    };

    getQuestion();
  }, [id, navigate, user.isMaintainer]);

  const handleSave = async () => {
    try {
      if (title.trim() === "") {
        showToast("Question title must have at least 3 characters.", "error");
        return;
      }
      if (description.trim().length < 3) {
        showToast(
          "Question description must have at least 3 characters.",
          "error"
        );
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
        description: description.trim(),
      };
      const response = await axios.put(url, params, header);

      if (response.status === 200) {
        showToast("Question saved successfully!", "success");
      } else {
        showToast(response.data, "error");
      }
    } catch (error) {
      if (error instanceof AxiosError)
        return showToast(error.response.data, "error");
      console.error(error);
      showToast("Unable to save the question. Please try again!", "error");
    }
  };

  if (isLoading) return <LinearProgress variant="indeterminate" />;

  return (
    <Page title="Edit Question">
      <Box height="calc(100vh - 64px)" width="100%">
        <Box
          height="100%"
          width="100%"
          display="flex"
          flexDirection="column"
          padding={1}
        >
          <Box display="flex" marginBottom={1}>
            <Tooltip title="Back to questions" placement="top" arrow>
              <IconButton onClick={() => navigate(`/questions`)}>
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
            <Box flexGrow={1} />
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Box>
          <Box flexGrow={1} overflow="clip">
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
          </Box>
        </Box>
      </Box>
      <AcknowledgementToast
        open={toastOpen}
        message={toastMessage}
        onClose={() => setToastOpen(false)}
        severity={toastSeverity}
      />
    </Page>
  );
};

export default EditQuestion;
