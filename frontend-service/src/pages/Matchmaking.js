import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";

const Matchmaking = () => {
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState('easy');
  const [msg, setMsg] = useState('');
  const [data, setData] = useState('');
  const [webSocket, setWebSocket] = useState({});
  const [matchedName, setMatchedName] = useState("");
  const [matchedEmail, setMatchedEmail] = useState("");
  const [matchedProfileImageUrl, setMatchedProfileImageUrl] = useState("");

  const token = window.localStorage.getItem("token");

  async function connectToServer() {            
      const ws = new WebSocket(`ws://token:${token}@localhost:3003?difficulty=${difficulty}`, token);
      return ws;
  }

  async function handleSave () {
      setMsg("sent");
      setData("");
      const ws = await connectToServer(); 
      setWebSocket(ws);
      
      ws.addEventListener("open", (event) => {
          setMsg("Connected to matching server!");
      });

      ws.addEventListener("message", async (event) => {
          console.log(event.data);
          const matchedUserID = event.data;
          try {
              const usersServiceUrl = `${process.env.REACT_APP_USERS_SERVICE_HOST}/match/${matchedUserID}`;
              const response = await axios.get(
                  usersServiceUrl,
                  { headers: { Authorization: token } }
              );
              console.log(response.data)
              setMatchedName(response.data.name)
              setMatchedEmail(response.data.email)
              setMatchedProfileImageUrl(response.data.profileImageUrl)
          } catch (error) {
              console.log(error.response.data);
              setMatchedName("")
              setMatchedEmail("")
              setMatchedProfileImageUrl("")
              throw new Error(error.response.data);
          }
          setData(`Message from socket: ${event.data}`);
      });
      
      ws.addEventListener("close", (event) => {
          console.log(event.reason);
          setWebSocket({});
          setData(`Socket close with reason: ${event.reason}`);
          setMsg("Connection to matching server closed");
      })
  }

  // for debugging
  useEffect(()=> {
      if (webSocket !== undefined && webSocket.length !== 0) {
          console.log(webSocket);
      }
  }, [webSocket]);

  const handleDifficultyChange = (event, newDifficulty) => {
    if (newDifficulty !== null) {
      setDifficulty(newDifficulty);
    }
  }

  return (
    <Stack alignItems="center" gap={2} pt={2}>
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
      <Button variant="contained" onClick={handleSave}>
        Let's Match!
      </Button>
      <Typography>{msg}</Typography>
      <Typography>{data}</Typography>
      <img src={matchedProfileImageUrl} alt="matched user profile image" />
      <Typography>matched Name:{matchedName}</Typography>
      <Typography>matched Name:{matchedEmail}</Typography>
    </Stack>
  );
}

export default Matchmaking;
