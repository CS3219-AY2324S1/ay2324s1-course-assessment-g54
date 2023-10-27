import axios from "axios";
import * as DOMPurify from "dompurify";
import * as marked from "marked";
import Editor from "@monaco-editor/react";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";

import Page from "../components/Page";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import AcknowledgementToast from "../components/AcknowledgementToast";

marked.use({ breaks: true, gfm: true, silent: true });

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

const Collaboration = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editorRef = useRef(null);

  const [socket, setSocket] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState(null);
  const [editorLanguage, setEditorLanguage] = useState("javascript");
  const [code, setCode] = useState(
    editorLanguage === "python"
      ? "# Insert your code here\n"
      : "// Insert your code here\n"
  );

  useEffect(() => {
    const roomId = searchParams.get("roomId");
    const difficulty = searchParams.get("difficulty");
    if (!roomId) return navigate("/matchmaking");
    const token = window.localStorage.getItem("token");
    const socket = io(`${process.env.REACT_APP_COLLABORATION_SERVICE_HOST}`, {
      query: { difficulty, roomId, token },
    });
    setSocket(socket);

    socket.on("show-notification", (notification) => {
      setToastMessage(notification);
      setIsToastOpen(true);
    });

    socket.on("set-question", async (questionId) => {
      const url = `${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/questions/${questionId}`;
      const response = await axios.get(url, {
        headers: { Authorization: token },
      });
      const question = response.data;
      if (!question.question_id) navigate("/matchmaking");
      setQuestion(question);
      setIsLoading(false);
      socket.emit("retrieve-code");
    });

    socket.on("broadcast-your-code", () => {
      socket.emit("broadcast-code", code);
    });

    socket.on("update-code", (code) => {
      setCode(code);
    });

    socket.on("disconnect", () => {
      return navigate("/matchmaking");
    });
  }, [navigate, searchParams]);

  useEffect(() => {
    editorRef.current?.focus();
  }, [editorLanguage]);

  const handleEditorLanguageChange = (event) =>
    setEditorLanguage(event.target.value);

  return (
    <Page title="Collab">
      <AcknowledgementToast
        message={toastMessage}
        open={isToastOpen}
        onClose={() => setIsToastOpen(false)}
        severity="success"
      />
      <Box height="calc(100vh - 64px)" width="100vw">
        {isLoading && <LinearProgress variant="indeterminate" />}
        {!isLoading && (
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
                    label={
                      question.complexity.charAt(0).toUpperCase() +
                      question.complexity.substring(1)
                    }
                    color={getDifficultyChipColor(question.complexity)}
                    size="small"
                    sx={{ color: "white" }}
                  />
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
                <Card
                  variant="outlined"
                  sx={{ flexGrow: 1, padding: 1, backgroundColor: "white" }}
                >
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
                <Stack direction="row" justifyContent="end" alignItems="center">
                  <Typography>Editor Language:</Typography>
                  <Select
                    value={editorLanguage}
                    onChange={handleEditorLanguageChange}
                    sx={{ height: 20, width: 130, m: 1 }}
                  >
                    <MenuItem value="javascript">Javascript</MenuItem>
                    <MenuItem value="python">Python</MenuItem>
                    <MenuItem value="java">Java</MenuItem>
                  </Select>
                </Stack>
                <Editor
                  language={editorLanguage}
                  value={code}
                  theme="vs-dark"
                  onMount={(editor) => {
                    editorRef.current = editor;
                    editorRef.current.focus();
                  }}
                  onChange={(code) => {
                    setCode(code);
                    socket.emit("broadcast-code", code);
                  }}
                />
              </Paper>
            </Box>
          </Box>
        )}
      </Box>
    </Page>
  );
};

export default Collaboration;
