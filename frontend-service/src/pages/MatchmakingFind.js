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
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import WarningIcon from "@mui/icons-material/Warning";

const difficulties = ["easy", "medium", "hard"];

const MatchmakingFind = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
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

    const closeEventHandler = async (event) => {
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
      ws.removeEventListener("close", closeEventHandler);
      ws.close(1000, "Client has left the page");
    };
  }, []);

  if (!user) return <LinearProgress variant="indeterminate" />;

  return (
    <Box height="calc(100vh - 64px)" width="100vw">
      <Stack
        height="100%"
        width="100%"
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
        <Box>
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
        </Box>
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
              <CircularProgress variant="indeterminate" />
            )}
            {!isMatchError && isMatchFound && (
              <>
                <Avatar
                  sx={{ width: 80, height: 80, marginBottom: 3 }}
                  alt={matchedUser.name}
                  src={matchedUser.profileImageUrl}
                />
                {matchedUser.name}
              </>
            )}
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );

  // return (
  //   <Stack alignItems="center" gap={2} pt={2}>
  //     <Typography>{msg}</Typography>
  //     <Typography>{data}</Typography>
  //     <Typography>{`Difficulty: ${difficulty}`}</Typography>
  //     <Box sx={{ display: "flex", flexDirection: "row" }}>
  //       <Card>
  //         <CardContent>
  //           <Stack padding={3} spacing={1} alignItems="center">
  //             <Avatar
  //               sx={{ width: 54, height: 54 }}
  //               alt={user.name}
  //               src={user.profileImageUrl}
  //             />
  //             <Typography variant="body1" align="center">
  //               {user.name}
  //             </Typography>
  //           </Stack>
  //         </CardContent>
  //       </Card>
  //       <Card
  //         sx={{
  //           display: "flex",
  //           flexDirection: "column",
  //           alignItems: "center",
  //           justifyContent: "center",
  //           p: 3,
  //           spacing: 2,
  //         }}
  //       >
  //         <CardContent>
  //           <Button variant="contained" onClick={handleSave}>
  //             Ready
  //           </Button>
  //         </CardContent>
  //       </Card>
  //       {isLoading ? (
  //         <Card
  //           sx={{
  //             display: "flex",
  //             flexDirection: "column",
  //             alignItems: "center",
  //             justifyContent: "center",
  //             p: 3,
  //           }}
  //         >
  //           <CircularProgress size="5rem" color="secondary" />
  //         </Card>
  //       ) : (
  //         <Card>
  //           <CardContent>
  //             <Stack padding={3} spacing={1} alignItems="center">
  //               {
  //                 <Avatar
  //                   sx={{ width: 54, height: 54 }}
  //                   alt={user.name}
  //                   src={matchedProfileImageUrl}
  //                 />
  //               }
  //               <Typography variant="body1" align="center">
  //                 {matchedName}
  //               </Typography>
  //             </Stack>
  //           </CardContent>
  //         </Card>
  //       )}
  //     </Box>
  //   </Stack>
  // );
};

export default MatchmakingFind;
