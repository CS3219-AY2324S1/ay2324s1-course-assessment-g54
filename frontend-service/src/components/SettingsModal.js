import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import EditProfileCard from "./EditProfileCard";
import DeleteAccountCard from "./DeleteAccountCard";

const SettingsModal = ({ isModalOpen, setIsModalOpen }) => {

  const handleCloseModal = () => setIsModalOpen(false);
  const [value, setValue] = useState("0");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal} sx={{ display: "grid", placeContent: "center" }}>
      <Card sx={{ width: 700 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4" sx={{ py: 3, pl: 4 }}>Settings</Typography>
          <IconButton onClick={handleCloseModal} sx={{ alignSelf: "flex-start", pt: 1 }}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Stack>
        <Box display='flex'>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="Edit Profile" value="0" icon={<EditIcon />} iconPosition="start" />
            <Tab label="Delete Account" value="1" icon={<DeleteIcon />} iconPosition="start" />
          </Tabs>
          <Box sx={{ mx: "auto", maxWidth: 400, height: 500 }}>
            {value == "0" && <EditProfileCard />}
            {value == "1" && <DeleteAccountCard />}
          </Box>
        </Box>
      </Card>
    </Modal>
  )
};

export default SettingsModal;
