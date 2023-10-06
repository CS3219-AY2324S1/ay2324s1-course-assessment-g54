import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useUser } from "../contexts/UserContext";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import WarningIcon from "@mui/icons-material/Warning";

const difficulties = ["easy", "medium", "hard"];

const MatchmakingFind = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTimeElapsed, setSearchTimeElapsed] = useState(0);
  const [isMatchError, setIsMatchError] = useState(false);
  const [isMatchFound, setIsMatchFound] = useState(false);
  const [matchedUser, setMatchedUser] = useState(null);

  useEffect(() => {
    const difficulty = searchParams.get("difficulty");
    if (!difficulty || !difficulties.includes(difficulty))
      return navigate("/matchmaking");

    const token = window.localStorage.getItem("token");
    const ws = new WebSocket(
      `${process.env.REACT_APP_MATCHMAKING_SERVICE_HOST}?difficulty=${difficulty}`,
      token
    );

    const clock = setInterval(
      () => setSearchTimeElapsed((prevState) => prevState + 1),
      1000
    );

    const closeEventHandler = async (event) => {
      clearInterval(clock);
      if (event.code !== 1000) {
        console.error(event.reason);
        return setIsMatchError(true);
      }
      const result = JSON.parse(event.reason);
      const matchedUserId = result.matchedUser;
      const getProfielUrl = `${process.env.REACT_APP_USERS_SERVICE_HOST}/profile/${matchedUserId}`;
      const response = await axios.get(getProfielUrl, {
        headers: { Authorization: token },
      });
      setMatchedUser(response.data);
      setIsMatchFound(true);
    };

    ws.addEventListener("close", closeEventHandler);

    return async () => {
      clearInterval(clock);
      ws.removeEventListener("close", closeEventHandler);
      ws.close(1000, "Client has left the page");
    };
  }, [navigate, searchParams]);

  if (!user) return <LinearProgress variant="indeterminate" />;

  return (
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
            spacing={3}
            width="200px"
            justifyContent="center"
            alignItems="center"
          >
            <Typography textAlign="center">
              Question Level:{" "}
              {searchParams.get("difficulty").charAt(0).toUpperCase() +
                searchParams.get("difficulty").substring(1)}
            </Typography>
            {!isMatchError && !isMatchFound && (
              <>
                <CircularProgress variant="indeterminate" />
                <Typography marginTop={3}>{searchTimeElapsed + "s"}</Typography>
              </>
            )}
            {!isMatchFound && (
              <Button
                variant="contained"
                color="error"
                onClick={() => navigate("/matchmaking")}
              >
                Cancel
              </Button>
            )}
            {isMatchFound && (
              <Button
                variant="contained"
                onClick={() => navigate("/matchmaking")}
              >
                Start
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

              {!isMatchError && !isMatchFound && (
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
              {!isMatchError && isMatchFound && (
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
        <Typography textAlign="center">
          Please hold on for a moment while we are searching for your partner...
        </Typography>
      </Stack>
    </Box>
  );
};

export default MatchmakingFind;
