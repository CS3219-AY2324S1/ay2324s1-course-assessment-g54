import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const DeleteAccountCard = () => {
  const navigate = useNavigate();
  const CONFIRM_DELETE_TEXT = "DELETE"

  const [isConfirmed, setIsConfirmed] = useState(false);
  const handleConfirmDeleteText = (event) => {
    setIsConfirmed(event.target.value == CONFIRM_DELETE_TEXT)
  }

  const handleDeleteAccount = async () => {
    if (isConfirmed) {
      const token = window.localStorage.getItem("token");
      try {
        await axios.delete(
          `${process.env.REACT_APP_USERS_SERVICE_HOST}/profile`,
          { headers: { Authorization: token } }
        );
        window.localStorage.removeItem("token");
        navigate("/login");
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  return (
    <Box display="flex" justifyContent="center" flexDirection="column" >
      <Typography mb={3}>Deleting your account will remove all your information from our database. This action cannot be undone.</Typography>
      <Typography>Please type in <strong>{CONFIRM_DELETE_TEXT}</strong> to confirm.</Typography>
      <TextField onChange={handleConfirmDeleteText} />
      {isConfirmed
        ? <Button onClick={handleDeleteAccount} variant="contained" color="error" sx={{ mt: 3 }}>Yes, I want to delete my account</Button>
        : <Button disabled onClick={handleDeleteAccount} variant="contained" color="error" sx={{ mt: 3 }}>Yes, I want to delete my account</Button>
      }
    </Box>
  )
}

export default DeleteAccountCard;
