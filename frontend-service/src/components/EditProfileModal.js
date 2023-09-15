import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import EditProfileCard from "./EditProfileCard";

const SettingsModal = ({isModalOpen, setIsModalOpen, children}) => {

  const handleCloseModal = () => setIsModalOpen(false);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal} sx={{ display: "grid", placeContent: "center" }}>
      <Card>
        <Typography variant="h2">Settings</Typography>
        <Box display='flex'>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="Edit Profile" />
            <Tab label="Delete Profile" />
          </Tabs>
          <EditProfileCard />
        </Box>
      </Card>
    </Modal>
  )
};

export default SettingsModal;
