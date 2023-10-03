import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const difficulties = ["easy", "medium", "hard"];
const getDifficultyChipColor = (difficulty) => {
  switch (difficulty) {
    case "easy":
      return "success";
    case "medium":
      return "warning";
    case "hard":
      return "error";
    default:
      return "primary";
  }
};

const Matchmaking = () => {
  const navigate = useNavigate();

  return (
    <Box height="calc(100vh - 64px)" width="100vw">
      <Stack
        spacing={6}
        height="100%"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          display="flex"
          justifyContent="center"
          alignItems="center"
          direction="row"
          spacing={3}
        >
          {difficulties.map((difficulty) => (
            <Card key={difficulty} sx={{ width: "200px" }}>
              <CardActionArea
                onClick={() =>
                  navigate(`/matchmaking/find?difficulty=${difficulty}`)
                }
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Chip
                    label={difficulty}
                    color={getDifficultyChipColor(difficulty)}
                    sx={{ marginTop: "150px" }}
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
        <Typography variant="h5">
          Please select the difficulty of the question you are finding a match
          for...
        </Typography>
      </Stack>
    </Box>
  );
};

export default Matchmaking;
