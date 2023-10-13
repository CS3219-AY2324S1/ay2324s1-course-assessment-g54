import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Example = () => {
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
    </Box>
  );
};

export default Example;
