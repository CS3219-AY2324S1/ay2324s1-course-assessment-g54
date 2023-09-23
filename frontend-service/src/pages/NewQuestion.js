import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AcknowledgementToast from "../components/AcknowledgementToast";
import QuestionForm from "../components/QuestionForm";

import { useUser } from "../contexts/UserContext";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
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
        showToast("Question title must be at least 3 characters.", "error")
        return;
      }
      if (description.trim().length < 3) {
        showToast("Question description must be at least 3 characters.", "error")
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
        description: description.trim()
      }

      const response = await axios.post(url, params, header);
      const question_id = response.data.question_id

      if (response.status === 200) {
        window.localStorage.setItem("successMessage", "Question saved successfully!");
        navigate(`/questions/${question_id}/edit`)
      } else {
        showToast("Unable to save the question. Please try again!", "error")
      }
    } catch (error) {
      console.error(error);
      showToast("Unable to save the question. Please try again!", "error")
    }
  };

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

export default NewQuestion;
