import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SimpleMde from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";

import ChipArray from "../components/ChipArray";
import NavBar from "../components/NavBar";
import SaveBar from "../components/SaveBar";
import Selector from "../components/Selector";

import { useUser } from "../contexts/UserContext";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

const NewQuestion = () => {
  const navigate = useNavigate();
  const user = useUser();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const [title, setTitle] = useState("");
  const [complexity, setComplexity] = useState("easy");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!user.isMaintainer) navigate("/questions");
  }, [navigate, user.isMaintainer]);

  const handleSave = async () => {
    try {
      if (title.trim() === "") {
        setAlertMessage("The question must have a title.");
        setAlertSeverity("error");
        setIsAlertOpen(true);
        return;
      }
      const url = `${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/questions`;
      const response = await axios.post(url, {
        title,
        complexity,
        categories,
        description,
      });
      setAlertMessage(
        response.status === 200
          ? "The question has been saved."
          : "There was an error when trying to save question."
      );
      setAlertSeverity(response.status === 200 ? "success" : "error");
      setIsAlertOpen(true);
    } catch (error) {
      console.error(error);
      setAlertMessage("There was an error when trying to save question.");
      setAlertSeverity("error");
      setIsAlertOpen(true);
    }
  };

  return (
    <>
      <NavBar />
      <SaveBar
        isOpen={isAlertOpen}
        messsage={alertMessage}
        severity={alertSeverity}
        onClose={() => setIsAlertOpen(false)}
      />
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
            <Stack height="calc(100% - 48px)" direction="row" spacing={1}>
              <Box width="50%" height="100%">
                <Stack width="100%" spacing={1}>
                  <Card variant="outlined" sx={{ padding: 1 }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Question Title"
                      defaultValue={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Card>
                  <Card variant="outlined" sx={{ padding: 1 }}>
                    <Selector
                      id="question-complexity"
                      label="Question Complexity"
                      options={["easy", "medium", "hard"]}
                      value={complexity}
                      onChange={(event) => setComplexity(event.target.value)}
                    />
                  </Card>
                  <Card variant="outlined" sx={{ padding: 1 }}>
                    <ChipArray
                      chips={categories}
                      helperText="Press enter to add a new category..."
                      label="Categories"
                      onAddChip={(newCategory) =>
                        setCategories((prevCategories) => [
                          ...prevCategories,
                          newCategory,
                        ])
                      }
                      onDeleteChip={(deletedCategory) =>
                        setCategories((prevCategories) =>
                          prevCategories.filter(
                            (category) => category !== deletedCategory
                          )
                        )
                      }
                    />
                  </Card>
                </Stack>
              </Box>
              <Box width="50%" height="100%">
                <Card sx={{ height: "100%", width: "100%", overflow: "auto" }}>
                  <SimpleMde
                    value={description}
                    onChange={(value) => setDescription(value)}
                  />
                </Card>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default NewQuestion;
