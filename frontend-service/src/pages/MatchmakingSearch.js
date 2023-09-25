import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../contexts/UserContext";

import Avatar from "@mui/material/Avatar";
import AvatarWithBadge from "../components/AvatarWithBadge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

let ws = null;

const MatchmakingSearch = () => {
  const user = useUser();
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState("");
  const [msg, setMsg] = useState('');
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const token = window.localStorage.getItem("token");

  useEffect(() => {
    const queryString = window.location.search;
    const difficulty = queryString.split("=")[1];
    setDifficulty(difficulty);

    async function connectToServer() {
      const ws = new WebSocket(`ws://token:${token}@localhost:3003?difficulty=${difficulty}`, token);
      return ws;
    }
    async function handleStart() {
      if (!ws) {
        setIsLoading(true);
        setMsg("sent start");
        ws = await connectToServer();
        //console.log("start");
        ws.addEventListener("open", (event) => {
          setMsg("connected to matching server!");
          setIsLoading(true);
        });

        ws.addEventListener("message", (event) => {
          //console.log(event.data);
          setData(`Message from server ${event.data}`);
          setIsLoading(true);
        });
      }
    }
    handleStart();
  }, [token]);

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
    navigate("/matchmaking");
  }

  return (
    <Stack alignItems="center" gap={2} pt={2}>
      <Typography>{msg}</Typography>
      <Typography>{data}</Typography>
      <Typography>
        {`Difficulty: ${difficulty}`}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Card>
          <CardContent>
            <Stack padding={3} spacing={1} alignItems="center">
              {user.isMaintainer
                ? <AvatarWithBadge />
                : <Avatar sx={{ width: 54, height: 54 }} alt={user.name} src="/static/images/avatar/2.jpg" />}
              <Typography variant="body1" align="center">
                {user.name}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3, spacing: 2 }}>
          <CardContent>
            <Button variant="contained" onClick={handleEnd}>
              Cancel Search!
            </Button>
          </CardContent>
        </Card>
        {isLoading ? <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3 }}>
          <CircularProgress size="5rem" color="secondary" />
        </Card> :
          <Card>
            <CardContent>
              <Stack padding={3} spacing={1} alignItems="center">
                {user.isMaintainer
                  ? <AvatarWithBadge />
                  : <Avatar sx={{ width: 54, height: 54 }} alt={user.name} src="/static/images/avatar/2.jpg" />}
                <Typography variant="body1" align="center">
                  {user.name}
                </Typography>
              </Stack>
            </CardContent>
          </Card>}
      </Box>
    </Stack>
  );
}

export default MatchmakingSearch;
