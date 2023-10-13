import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PageNotFound from "../assets/PageNotFound.svg";

const Example = () => {
  return (
    <Box sx={{ my: 4, display: "grid", placeContent: "center" }}>
      <Typography textAlign="center" variant="h3" fontWeight="bold">
        PAGE NOT FOUND
      </Typography>
      <img
        src={PageNotFound}
        alt="Page not found"
        style={{ maxWidth: "100%" }}
      />
    </Box>
  );
};

export default Example;
