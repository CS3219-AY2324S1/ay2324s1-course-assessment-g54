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
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';

const NavBar = () => {
  const navigate = useNavigate();
  const user = useUser();
  const [anchorElement, setAnchorElement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState(user.name);
  const [inputName, setInputName] = useState(user.name);

  const handleOpenUserMenu = (event) => setAnchorElement(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElement(null);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleUpdateName = (event) => {
    event.preventDefault();
    setUserName(inputName);
    setIsModalOpen(false);
  }

  const EditProfileModal = (
    <Modal open={isModalOpen} onClose={handleCloseModal} sx={{ display: "grid", placeContent: "center" }}>
      <Card sx={{minWidth:400, textAlign: 'center', p: 1, borderRadius: 1, px: 2, py: 2 }}>
        <form onSubmit={handleUpdateName}>
          <Stack spacing={3}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" >
              <Typography variant="h4" sx={{ fontSize: '30px', fontWeight: 400 }}>Edit Profile</Typography>
              <Avatar
                sx={{ width: 70, height: 70 }}
                alt="a"
                src="/static/images/avatar/2.jpg"
              />
            </Stack>
            <Stack direction="row" alignItems="center" >
              <Typography variant="body1" sx={{ fontWeight: 600, mr: 2 }}>Name</Typography>
              <TextField defaultValue={userName} sx={{ flex: '1 1 auto' }} variant="outlined" onChange={(e) => setInputName(e.target.value)} />
            </Stack>
            <Stack direction="row" alignItems="center" >
              <Typography variant="body1" sx={{ fontWeight: 600, mr: '18px' }}>Email</Typography>
              <TextField disabled defaultValue={user.email} sx={{ flex: '1 1 auto' }} variant="outlined" />
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="flex-end" pt={4} spacing={2}>
            <Button variant="outlined" onClick={handleCloseModal} sx={{minWidth: 100}}> Cancel </Button>
            <Button variant="contained" type='submit' sx={{minWidth: 100}}> Save</Button>
          </Stack>
        </form>
      </Card>
    </Modal>
  );

  return (
    <AppBar position="static">
      {isModalOpen && EditProfileModal}
      <Toolbar disableGutters sx={{ paddingX: 1.5 }}>
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
              <Avatar
                sx={{ width: 54, height: 54 }}
                alt={user.name}
                src="/static/images/avatar/2.jpg"
              />
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
                onClick={handleOpenModal}
              >
                Edit Profile
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
