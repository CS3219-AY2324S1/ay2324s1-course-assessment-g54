import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const Matchmaking = () => {
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState('easy');
  const [msg, setMsg] = useState('');
  const [data, setData] = useState('');


  const handleDifficultyChange = (event, newDifficulty) => {
    if (newDifficulty !== null) {
      setDifficulty(newDifficulty);
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
      <Button variant="contained" onClick={() => navigate(`/matchmaking/find?difficulty=${difficulty}`)}>
        Let's Match!
      </Button>
      <Typography>{msg}</Typography>
      <Typography>{data}</Typography>
    </Stack>
  );
}

/*

*/
export default Matchmaking;
