import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useUser } from "../contexts/UserContext";


import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";


const MatchmakingSearch = () => {
  const user = useUser();
  const navigate = useNavigate();

  const [webSocket, setWebSocket] = useState({});
  const [difficulty, setDifficulty] = useState("");
  const [msg, setMsg] = useState('');
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [matchedName, setMatchedName] = useState("");
  const [matchedProfileImageUrl, setMatchedProfileImageUrl] = useState("");

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

      setIsLoading(true);
      setMsg("sent");
      setData("");
      const ws = await connectToServer(); 
      setWebSocket(ws);

      ws.addEventListener("open", (event) => {
        setMsg("connected to matching server!");
        setIsLoading(true);
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
            setMatchedProfileImageUrl(response.data.profileImageUrl)
            setIsLoading(false);
        } catch (error) {
            console.log(error.response.data);
            setMatchedName("")
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
          //setIsLoading(false);
      })
    }
    handleStart();
    // return () => {
    //   if (webSocket) {
    //     webSocket.close();
    //   }
    // }
  }, [token]);

  // async function handleEnd() {
  //   if (webSocket) {
  //     setMsg("sent end");
  //     console.log("close");
  //     webSocket.addEventListener("close", (event) => {
  //       console.log(event.data);
  //       setMsg("connection to matching server closed");
  //       setIsLoading(false);
  //       setWebSocket({});
  //     })
  //     webSocket.close();
  //   }
  //   navigate("/matchmaking");
  // }

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
                <Avatar sx={{ width: 54, height: 54 }} alt={user.name} src="/static/images/avatar/2.jpg" />
              <Typography variant="body1" align="center">
                {user.name}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3, spacing: 2 }}>
          <CardContent>
            <Button variant="contained">
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
                {<Avatar sx={{ width: 54, height: 54 }} alt={user.name} src={matchedProfileImageUrl} />}
                <Typography variant="body1" align="center">
                  {matchedName}
                </Typography>
              </Stack>
            </CardContent>
          </Card>}
      </Box>
    </Stack>
  );
}

export default MatchmakingSearch;
