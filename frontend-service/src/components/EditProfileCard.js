import axios from "axios";
import { useState } from "react";
import { useUser, useUserDispatch } from "../contexts/UserContext";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import AcknowledgementToast from "../components/AcknowledgementToast";

const EditProfileCard = () => {
  const user = useUser();
  const dispatch = useUserDispatch();
  const [inputName, setInputName] = useState(user.name);
  const [inputProfileImageUrl, setInputProfileImageUrl] = useState(user.profileImageUrl);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("info");
  
  const updateProfile = async (event) => {
    event.preventDefault();
    const token = window.localStorage.getItem("token");
    try {
      
      await axios.put(
        `${process.env.REACT_APP_USERS_SERVICE_HOST}/profile`,
        { name: inputName, profileImageUrl: inputProfileImageUrl, },
        { headers: { Authorization: token } }
      );
      showToast("Profile saved succesfully!", "success");
    } catch (error) {
      showToast("Error in saving profile. Please try again!", "error");
      console.error(error.message);
    }
    dispatch({ type: "set", user: { ...user, name: inputName, profileImageUrl: inputProfileImageUrl} })
  }

  const showToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setToastOpen(true);
  };

  return (
    <Box sx={{ minWidth: 400, textAlign: 'center', p: 1, px: 2, py: 2 }}>
      <form onSubmit={updateProfile}>
        <Stack spacing={3}>
          <TextField
            required
            label="Name"
            defaultValue={user.name}
            variant="outlined"
            onChange={(e) => setInputName(e.target.value)}
          />
          <TextField
            label="Email"
            defaultValue={user.email}
            variant="outlined"
            helperText="Email cannot be modified"
            disabled
          />
          <TextField
            label="Profile Image URL"
            defaultValue={user.profileImageUrl}
            variant="outlined"
            onChange={(e) => setInputProfileImageUrl(e.target.value)}
          />
        </Stack>
        <Stack direction="row" justifyContent="flex-end" pt={4} spacing={2}>
          <Button variant="contained" type='submit' sx={{ minWidth: 100 }}>Save</Button>
        </Stack>
      </form>
      <AcknowledgementToast
        open={toastOpen}
        message={toastMessage}
        onClose={() => setToastOpen(false)}
        severity={toastType}
      />
    </Box>
  )
}

export default EditProfileCard;
