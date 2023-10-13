import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const Example = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ my: 4, display: "grid", placeContent: "center" }}>
      <Typography textAlign="center" variant="h3" fontWeight="bold">
        PAGE NOT FOUND
      </Typography>
      <img
        src={"PageNotFound.svg"}
        alt="Page not found"
        style={{ maxWidth: "100%" }}
      />
      <Button 
        onClick={() => navigate(-1)}
        sx={{
          backgroundColor: (theme) => theme.palette.navbarButtonSelected, 
          fontSize: 20,
          py:2,
          color: "white",
          "&:hover": {
            backgroundColor: (theme) => theme.palette.navbarButtonHover,
          },
        }} 
      >
        Go back
      </Button>
    </Box>
  );
};

export default Example;
