import { useNavigate, useLocation } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import QuizIcon from "@mui/icons-material/Quiz";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: (theme) => theme.palette.background.navBar }}
    >
      <Toolbar disableGutters sx={{ paddingRight: 1.5 }}>
        <Button
          onClick={() => {
            navigate("/questions");
          }}
          sx={{
            borderRadius: 2,
            boxShadow: "none",
            py: "12px",
            px: 3,
            mx: 1,
            minWidth: "160px",
            backgroundColor:
              location.pathname === "/questions"
                ? (theme) => theme.palette.navbarButtonSelected
                : "transparent",
            color: "white",
            "&:hover": {
              backgroundColor: (theme) => theme.palette.navbarButtonHover,
            },
          }}
          variant="contained"
          startIcon={<QuizIcon />}
        >
          Questions
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ flexGrow: 0 }}></Box>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
