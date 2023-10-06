import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AcknowledgementToast from "../components/AcknowledgementToast";
import QuestionForm from "../components/QuestionForm";

import { useUser } from "../contexts/UserContext";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const NewQuestion = () => {
  const navigate = useNavigate();
  const user = useUser();

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("info");

  const [title, setTitle] = useState("");
  const [complexity, setComplexity] = useState("easy");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!user.isMaintainer) navigate("/questions");
  }, [navigate, user.isMaintainer]);

  const showToast = (message, severity) => {
    setToastMessage(message);
    setToastSeverity(severity);
    setToastOpen(true);
  };

  const handleSave = async () => {
    try {
      if (title.trim().length < 3) {
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
      const url = `${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/questions`;
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

      const response = await axios.post(url, params, header);
      const question_id = response.data.question_id;

      if (response.status === 200) {
        window.localStorage.setItem(
          "successMessage",
          "Question saved successfully!"
        );
        navigate(`/questions/${question_id}/edit`);
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

  return (
    <>
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
    </>
  );
};

export default NewQuestion;
