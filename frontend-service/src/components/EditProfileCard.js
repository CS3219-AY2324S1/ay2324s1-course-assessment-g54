import axios from "axios";
import { useState } from "react";
import { useUser, useUserDispatch } from "../contexts/UserContext";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const EditProfileCard = () => {
  const user = useUser();
  const dispatch = useUserDispatch();
  const [inputName, setInputName] = useState(user.name);
  const [inputProfileImageUrl, setInputProfileImageUrl] = useState(user.profileImageUrl);
  
  const handleUpdateName = async (event) => {
    event.preventDefault();
    const token = window.localStorage.getItem("token");
    try {
      await axios.put(
        `${process.env.REACT_APP_USERS_SERVICE_HOST}/profile`,
        { name: inputName, profileImageUrl: inputProfileImageUrl, },
        { headers: { Authorization: token } }
      );
    } catch (error) {
      console.error(error.message);
    }
    dispatch({ type: "set", user: { ...user, name: inputName, profileImageUrl: inputProfileImageUrl} })
  }

  return (
    <Box sx={{ minWidth: 400, textAlign: 'center', p: 1, px: 2, py: 2 }}>
      <form onSubmit={handleUpdateName}>
        <Stack spacing={3}>
          <Stack direction="row" alignItems="center" >
            <Typography variant="body1" sx={{ fontWeight: 600, mr: 2 }}>Profile Image URL</Typography>
            <TextField defaultValue={user.profileImageUrl} sx={{ flex: '1 1 auto' }} variant="outlined" onChange={(e) => setInputProfileImageUrl(e.target.value)} />
          </Stack>
          <Stack direction="row" alignItems="center" >
            <Typography variant="body1" sx={{ fontWeight: 600, mr: 2 }}>Name</Typography>
            <TextField defaultValue={user.name} sx={{ flex: '1 1 auto' }} variant="outlined" onChange={(e) => setInputName(e.target.value)} />
          </Stack>
          <Stack direction="row" alignItems="center" >
            <Typography variant="body1" sx={{ fontWeight: 600, mr: '18px' }}>Email</Typography>
            <TextField disabled defaultValue={user.email} sx={{ flex: '1 1 auto' }} variant="outlined" />
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="flex-end" pt={4} spacing={2}>
          <Button variant="contained" type='submit' sx={{ minWidth: 100 }}> Save</Button>
        </Stack>
      </form>
    </Box>
  )
}

export default EditProfileCard;
