import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../contexts/UserContext";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import SettingsModal from "./SettingsModal";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/ExitToApp';
import AvatarWithBadge from "./AvatarWithBadge";
import MatchmakingIcon from '@mui/icons-material/PeopleOutline';

const NavBar = () => {
  const navigate = useNavigate();
  const user = useUser();

  const [anchorElement, setAnchorElement] = useState(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const handleOpenUserMenu = (event) => setAnchorElement(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElement(null);
  const handleOpenSettingsModal = () => setIsSettingsModalOpen(true);

  return (
    <AppBar position="static">
      <SettingsModal isModalOpen={isSettingsModalOpen} setIsModalOpen={setIsSettingsModalOpen}/>
      <Toolbar disableGutters sx={{ paddingRight: 1.5}}>
        <Button onClick={() => navigate("/questions/matchmakingLoading")} sx={{ height:65, borderRadius: 0, boxShadow: "none"}} variant="contained" color="success" startIcon={<MatchmakingIcon/>}>
          Find Match
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title={user.name}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={user.name} src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Popover
            open={Boolean(anchorElement)}
            anchorEl={anchorElement}
            onClose={handleCloseUserMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Stack padding={3} spacing={1} alignItems="center">
              {user.isMaintainer
              ? <AvatarWithBadge/>  
              : <Avatar sx={{ width: 54, height: 54 }} alt={user.name} src="/static/images/avatar/2.jpg" />
 }
              <Typography variant="body1" align="center">
                {user.name}
              </Typography>
              <Typography variant="body2" align="center" color="gray">
                {user.email}
              </Typography>
            </Stack>
            <Stack padding={3} spacing={1} alignItems="center">
              <Button
                variant="contained"
                fullWidth
                size="small"
                onClick={handleOpenSettingsModal}
                startIcon={<SettingsIcon/>}
              >
                Settings
              </Button>
              <Button
                variant="contained"
                fullWidth
                size="small"
                color="error"
                onClick={() => {
                  window.localStorage.removeItem("token");
                  navigate("/login");
                }}
                startIcon={<LogoutIcon/>}
              >
                Sign Out
              </Button>
            </Stack>
          </Popover>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default NavBar;
