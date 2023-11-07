import axios from "axios";
import * as DOMPurify from "dompurify";
import * as marked from "marked";
import Editor from "@monaco-editor/react";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";

import Page from "../components/Page";
import VideoChat from "../components/VideoChat";

import { styled } from "@mui/material/styles";

import Avatar from "@mui/material/Avatar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import AcknowledgementToast from "../components/AcknowledgementToast";

import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

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
  const [collaboratingUser, setCollaboratingUser] = useState(null);
  const [editorLanguage, setEditorLanguage] = useState("javascript");
  const [code, setCode] = useState(
    editorLanguage === "python"
      ? "# Insert your code here\n"
      : "// Insert your code here\n"
  );
  const [isVideoCalling, setIsVideoCalling] = useState(false);

  useEffect(() => {
    const roomId = searchParams.get("roomId");
    const difficulty = searchParams.get("difficulty");
    if (!roomId) return navigate("/matchmaking");
    const token = window.localStorage.getItem("token");
    const socket = io(`${process.env.REACT_APP_COLLABORATION_SERVICE_HOST}`, {
      query: { difficulty, roomId, token },
      path: "/api/collaboration-service",
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

    socket.on("set-collaborating-user", async (userId) => {
      if (!userId) return setCollaboratingUser(null);
      const url = `${process.env.REACT_APP_USERS_SERVICE_HOST}/profile/${userId}`;
      const response = await axios.get(url, {
        headers: { Authorization: token },
      });
      if (response.status === 200) setCollaboratingUser(response.data);
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

    return async () => {
      socket.disconnect();
    };
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
            <Box
              position="fixed"
              bottom={40}
              right={40}
              zIndex={10}
              display="flex"
            >
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingX: 3,
                  paddingY: 1,
                  backgroundColor: (theme) => theme.palette.background.light,
                }}
              >
                {!collaboratingUser && (
                  <Typography color="gray">
                    Waiting for your partner to join...
                  </Typography>
                )}
                {!collaboratingUser && (
                  <CircularProgress
                    variant="indeterminate"
                    sx={{ marginLeft: 3 }}
                  />
                )}
                {collaboratingUser && (
                  <Typography color="gray">Collaborating with</Typography>
                )}
                {collaboratingUser && (
                  <Tooltip
                    title={collaboratingUser.name}
                    placement="top-end"
                    arrow
                  >
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                    >
                      <Avatar
                        sx={{ marginLeft: 2 }}
                        alt={collaboratingUser.name}
                        src={collaboratingUser.profileImageUrl}
                      />
                    </StyledBadge>
                  </Tooltip>
                )}
              </Card>
              {collaboratingUser && (
                <Tooltip title={"Start video call"} placement="top-end" arrow>
                  <Fab sx={{ marginLeft: 2 }} color="primary">
                    {isVideoCalling && <VideocamOffIcon fontSize="large"
                      onClick={() => {
                        setIsVideoCalling(!isVideoCalling);
                      }}
                    />
                    }
                    {!isVideoCalling && <VideocamIcon
                      fontSize="large"
                      onClick={() => {
                        setIsVideoCalling(!isVideoCalling);
                      }}
                    />
                    }

                  </Fab>
                </Tooltip>
              )}
            </Box>
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
            <Box
              width="50%"
              height={"100%"}
              display="flex"
              flexDirection="column"
              padding={1}
            >
              <Box border="1px solid pink">
                {isVideoCalling && (
                  <VideoChat roomId={searchParams.get("roomId") || ""} />
                )}
              </Box>
              <Paper
                sx={{
                  height: isVideoCalling ? "80%" : "100%",
                  width: "100%",
                  overflow: "hidden",
                }}
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

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
