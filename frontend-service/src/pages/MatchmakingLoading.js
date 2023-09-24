import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";

import Avatar from "@mui/material/Avatar";
import AvatarWithBadge from "../components/AvatarWithBadge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
let ws = null;

const Matchmaking = () => {
  const user = useUser();

  const [difficulty, setDifficulty] = useState('easy');
  const [msg, setMsg] = useState('');
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const token = window.localStorage.getItem("token");


  const handleDifficultyChange = (event, newDifficulty) => {
    if (newDifficulty !== null) {
      setDifficulty(newDifficulty);
    }
  }

  async function connectToServer() {
    const ws = new WebSocket(`ws://token:${token}@localhost:3003?difficulty=${difficulty}`, token);
    return ws;
  }

  async function handleStart() {
    if (!ws) {
      setIsLoading(true);
      setMsg("sent start");
      ws = await connectToServer();
      console.log("start");
      ws.addEventListener("open", (event) => {
        setMsg("connected to matching server!");
        setIsLoading(true);
      });

      ws.addEventListener("message", (event) => {
        console.log(event.data);
        setData(`Message from server ${event.data}`);
        setIsLoading(true);
      });
    }
  }

  async function handleEnd() {
    if (ws) {
      setMsg("sent end");
      console.log("close");
      ws.addEventListener("close", (event) => {
        console.log(event.data);
        setMsg("connection to matching server closed");
        setIsLoading(false);
        ws = null;
      })

      ws.close();
    }
  }

  return (
    <Stack bgcolor="whitesmoke" alignItems="center" gap={2} pt={2}>
      <Stack direction="row" alignItems="center" gap={2}>
        <Typography fontSize={20}>Difficulty: </Typography>
        <ToggleButtonGroup value={difficulty} exclusive onChange={handleDifficultyChange}>
          <ToggleButton value="easy" sx={{ width: '100px' }}>
            <Typography color="success" backgroundColor="success">
              Easy
            </Typography>
          </ToggleButton>
          <ToggleButton value="medium" sx={{ width: '100px' }}>
            <Typography color="success" backgroundColor="success">
              Medium
            </Typography>
          </ToggleButton>
          <ToggleButton value="hard" sx={{ width: '100px' }}>
            <Typography color="success" backgroundColor="success">
              Hard
            </Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Button variant="contained" onClick={handleStart}>
        Let's Match!
      </Button>
      <Typography>{msg}</Typography>
      <Typography>{data}</Typography>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Card sx={{ mr: 1 }}>
          <CardContent>
            <Stack padding={3} spacing={1} alignItems="center">
              {user.isMaintainer
                ? <AvatarWithBadge />
                : <Avatar sx={{ width: 54, height: 54 }} alt={user.name} src="/static/images/avatar/2.jpg" />}
              <Typography variant="body1" align="center">
                {user.name}
              </Typography>
              <Typography variant="body2" align="center" color="gray">
                {user.email}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ mr: 1 }}>
          <CardContent>
            <Button variant="contained" onClick={handleEnd}>
              Cancel Matchmaking!
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            {isLoading ? <CircularProgress padding="100" color="secondary" /> :
              <Stack padding={3} spacing={1} alignItems="center">
                {user.isMaintainer
                  ? <AvatarWithBadge />
                  : <Avatar sx={{ width: 54, height: 54 }} alt={user.name} src="/static/images/avatar/2.jpg" />}
                <Typography variant="body1" align="center">
                  {user.name}
                </Typography>
                <Typography variant="body2" align="center" color="gray">
                  {user.email}
                </Typography>
              </Stack>}
          </CardContent>
        </Card>
      </Box>
    </Stack>
  );
}

/*

*/
export default Matchmaking;