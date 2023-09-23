import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import NavBar from "../components/NavBar";
import React, { useEffect, useState } from "react";

const Temp =  () => {
    const [difficulty, setDifficulty] = useState('');
    const [msg, setMsg] = useState('');
    const [data, setData] = useState('');
    const [webSocket, setWebSocket] = useState({});

    const token = window.localStorage.getItem("token");

    const handleChange = (event) => {
        setDifficulty(event.target.value);
    };

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

        ws.addEventListener("message", (event) => {
            console.log(event.data);
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

    return (
    <>
    <NavBar />
    <Box height="calc(100vh - 64px)" width="100vw" bgcolor="whitesmoke">
        <Box display="flex" flexDirection="column" alignItems="center">
        
            <Box padding={2} sx={{ maxWidth: 200, minWidth: 200 }}>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={difficulty}
                    label="Difficulty"
                    onChange={handleChange}
                >
                    <MenuItem value={"easy"}>Easy</MenuItem>
                    <MenuItem value={"medium"}>Medium</MenuItem>
                    <MenuItem value={"hard"}>Hard</MenuItem>
                </Select>
                </FormControl>
            </Box>

            <Button variant="contained" onClick={handleSave}>
                Let's Match!
            </Button>

            <Typography>{msg}</Typography>
            <Typography>{data}</Typography>
        </Box>
    </Box>
    </>
    );
}

export default Temp;