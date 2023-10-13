import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <Box height="100vh" width="100vw" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Typography textAlign="center" variant="h4" fontWeight="bold">
        Page not found
      </Typography>
      <img
        src={"PageNotFound.svg"}
        alt="Page not found"
        style={{ maxWidth: "100%" }}
      />
      <Button 
        onClick={() => navigate(-1)}
        variant="contained"
      >
        Go back
      </Button>
    </Box>
  );
};

export default Error;
