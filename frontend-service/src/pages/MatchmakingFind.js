import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";

import { useUser } from "../contexts/UserContext";

import Page from "../components/Page";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import WarningIcon from "@mui/icons-material/Warning";

const difficulties = ["easy", "medium", "hard"];

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

const MatchmakingFind = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTimeElapsed, setSearchTimeElapsed] = useState(30);
  const [isMatchError, setIsMatchError] = useState(false);
  const [isMatchFinding, setIsMatchFinding] = useState(true);
  const [matchedUser, setMatchedUser] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const isMatchFailed = !isMatchFinding && matchedUser == null;
  const isMatchPassed = !isMatchFinding && matchedUser;

  useEffect(() => {
    const difficulty = searchParams.get("difficulty");
    if (!difficulty || !difficulties.includes(difficulty))
      return navigate("/matchmaking");

    const token = window.localStorage.getItem("token");
    const socket = io(`${process.env.REACT_APP_MATCHMAKING_SERVICE_HOST}`, {
      query: { difficulty, token },
      path: "/api/matchmaking-service",
    });

    let isFindingStoppedByFrontend = false;
    const clock = setInterval(() => {
      setSearchTimeElapsed((prevState) => {
        if (prevState > 0) return prevState - 1;
        setIsMatchFinding(false);
        clearInterval(clock);
        isFindingStoppedByFrontend = true;
        socket.disconnect();
        return 30;
      });
    }, 1000);

    let isUserMatched = false;
    socket.on("user-matched", async ({ matchedUser, roomId }) => {
      isUserMatched = true;
      clearInterval(clock);
      const getProfielUrl = `${process.env.REACT_APP_USERS_SERVICE_HOST}/profile/${matchedUser}`;
      const response = await axios.get(getProfielUrl, {
        headers: { Authorization: token },
      });
      setMatchedUser(response.data);
      setRoomId(roomId);
      setIsMatchFinding(false);
    });

    socket.on("disconnect", () => {
      if (!isUserMatched && !isFindingStoppedByFrontend) setIsMatchError(true);
    });

    return async () => {
      clearInterval(clock);
      socket.disconnect();
    };
  }, [navigate, searchParams]);

  if (!user) return <LinearProgress variant="indeterminate" />;

  return (
    <Page title="Find Matchmaking">
      <Box height="calc(100vh - 64px)" width="100vw">
        <Stack
          height="100%"
          width="100%"
          justifyContent="center"
          alignItems="center"
          spacing={6}
        >
          <Stack
            display="flex"
            justifyContent="center"
            alignItems="center"
            direction="row"
            spacing={6}
          >
            <Card>
              <CardContent
                sx={{
                  height: "200px",
                  width: "160px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{ width: 80, height: 80, marginBottom: 3 }}
                  alt={user.name}
                  src={user.profileImageUrl}
                />
                {user.name}
              </CardContent>
            </Card>
            <Stack
              spacing={2.7}
              width="200px"
              justifyContent="center"
              alignItems="center"
            >
              <Chip
                label={
                  searchParams.get("difficulty").charAt(0).toUpperCase() +
                  searchParams.get("difficulty").substring(1)
                }
                color={getDifficultyChipColor(
                  searchParams.get("difficulty").substring(0)
                )}
                sx={{ fontSize: "15px", color: "white" }}
              />
              {!isMatchError && isMatchFinding && (
                <>
                  <CircularProgress variant="indeterminate" />
                  <Typography marginTop={3}>
                    {searchTimeElapsed + "s"}
                  </Typography>
                </>
              )}
              {isMatchFinding && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => navigate("/matchmaking")}
                >
                  Cancel
                </Button>
              )}
              {isMatchFailed && (
                <Button variant="contained" onClick={() => navigate(0)}>
                  Retry
                </Button>
              )}
              {isMatchPassed && (
                <Button
                  variant="contained"
                  onClick={() =>
                    navigate(
                      `/collaboration?roomId=${roomId}&difficulty=${searchParams.get(
                        "difficulty"
                      )}`
                    )
                  }
                >
                  ENTER ROOM
                </Button>
              )}
            </Stack>
            <Card>
              <CardContent
                sx={{
                  height: "200px",
                  width: "160px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {isMatchError && (
                  <>
                    <WarningIcon color="warning" fontSize="large" />
                    <Typography textAlign="center" marginTop={1}>
                      There was an error when searching for a match...
                    </Typography>
                  </>
                )}
                {!isMatchError && isMatchFailed && (
                  <>
                    <SentimentVeryDissatisfiedIcon fontSize="large" />
                    <Typography textAlign="center" marginTop={1}>
                      Unable to find a match.
                    </Typography>
                  </>
                )}
                {!isMatchError && isMatchFinding && (
                  <Box
                    sx={{
                      height: "160px",
                      width: "130px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Skeleton variant="circular">
                        <Avatar
                          sx={{
                            width: 80,
                            height: 80,
                            marginTop: 1,
                            marginBottom: 3,
                          }}
                        ></Avatar>
                      </Skeleton>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Skeleton width="100%" variant="rectangular">
                        <Avatar></Avatar>
                      </Skeleton>
                    </Box>
                  </Box>
                )}
                {!isMatchError && isMatchPassed && (
                  <Box
                    sx={{
                      height: "160px",
                      width: "130px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Avatar
                        sx={{
                          width: 80,
                          height: 80,
                          marginTop: 2,
                          marginBottom: 3,
                        }}
                        alt={matchedUser.name}
                        src={matchedUser.profileImageUrl}
                      />
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <>{matchedUser.name}</>
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Stack>
          {!isMatchError && isMatchFinding && (
            <Typography textAlign="center">
              Please hold on for a moment while we are searching for your
              partner...
            </Typography>
          )}
          {!isMatchError && isMatchPassed && (
            <Typography textAlign="center">
            Match found! Head over to the collaboration room and have fun coding :D
          </Typography>
          )}
        </Stack>
      </Box>
    </Page>
  );
};

export default MatchmakingFind;
