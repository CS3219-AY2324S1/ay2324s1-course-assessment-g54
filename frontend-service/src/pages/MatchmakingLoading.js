import { Box, Button, Typography, ToggleButton, ToggleButtonGroup, Stack, LinearProgress, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

const Matchmaking =  () => {
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

    async function handleSave () {
        setIsLoading(true);
        setMsg("sent"); 
        const ws = await connectToServer(); 

        ws.addEventListener("open", (event) => {
            setMsg("connected to matching server!");
            setIsLoading(false);
        });

        ws.addEventListener("message", (event) => {
            console.log(event.data);
            setData(`Message from server ${event.data}`);
            setIsLoading(false);
        });
        
        ws.addEventListener("close", (event) => {
            console.log(event.data);
            setMsg("connection to matching server closed");
            setIsLoading(false);
        })
    }

  return (
    <Stack sx={{backgroundColor: "primary"}} alignItems="center" gap={2} pt={2}>
      <Stack direction="row" alignItems="center" gap={2}>
        <Typography fontSize={20}>Difficulty: </Typography>
        <ToggleButtonGroup value={difficulty} exclusive onChange={handleDifficultyChange}>
          <ToggleButton value="easy" sx={{ width: '100px'}}>
            <Typography color="success" backgroundColor="success">
              Easy
            </Typography>
          </ToggleButton>
          <ToggleButton value="medium" sx={{ width: '100px'}}>
            <Typography color="success" backgroundColor="success">
              Medium
            </Typography>
          </ToggleButton>
          <ToggleButton value="hard" sx={{ width: '100px'}}>
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
      {isLoading && <CircularProgress color="secondary" />}
    </Stack>
  );
}

/*

*/
export default Matchmaking;