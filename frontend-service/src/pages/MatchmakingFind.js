import { useEffect } from "react";
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

const difficulties = ["easy", "medium", "hard"];

const MatchmakingFind = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const difficulty = searchParams.get("difficulty");
    if (!difficulty || !difficulties.includes(difficulty))
      return navigate("/matchmaking");

    const token = window.localStorage.getItem("token");
    const ws = new WebSocket(
      `${process.env.REACT_APP_MATCHMAKING_SERVICE_HOST}?difficulty=${difficulty}`,
      token
    );

    ws.addEventListener("close", (event) => {
      console.log(event);
    });

    return () => {
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
          <Button
            variant="contained"
            color="error"
            onClick={() => navigate("/matchmaking")}
          >
            Cancel
          </Button>
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
            <CircularProgress variant="indeterminate" />
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
