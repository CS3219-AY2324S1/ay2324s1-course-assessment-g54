import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useUserDispatch } from "../contexts/UserContext";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const EditProfileModal = ({isModalOpen, setIsModalOpen}) => {
  const navigate = useNavigate();
  const user = useUser();
  const dispatch = useUserDispatch();

  const [inputName, setInputName] = useState(user.name);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleUpdateName = async (event) => {
    event.preventDefault();
    const token = window.localStorage.getItem("token");
    try {
        const response = await axios.put(
          `${process.env.REACT_APP_USERS_SERVICE_HOST}/profile`,
          {...user, name: inputName},
          { headers: { Authorization: token } }
        );
      } catch (error) {
        console.error(error.message);
        navigate("/login");
      }

    dispatch({type: "set", user: {...user, name: inputName }})
    setIsModalOpen(false);
  }

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal} sx={{ display: "grid", placeContent: "center" }}>
      <Card sx={{ minWidth: 400, textAlign: 'center', p: 1, borderRadius: 1, px: 2, py: 2 }}>
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
              <TextField defaultValue={user.name} sx={{ flex: '1 1 auto' }} variant="outlined" onChange={(e) => setInputName(e.target.value)} />
            </Stack>
            <Stack direction="row" alignItems="center" >
              <Typography variant="body1" sx={{ fontWeight: 600, mr: '18px' }}>Email</Typography>
              <TextField disabled defaultValue={user.email} sx={{ flex: '1 1 auto' }} variant="outlined" />
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="flex-end" pt={4} spacing={2}>
            <Button variant="outlined" onClick={handleCloseModal} sx={{ minWidth: 100 }}> Cancel </Button>
            <Button variant="contained" type='submit' sx={{ minWidth: 100 }}> Save</Button>
          </Stack>
        </form>
      </Card>
    </Modal>
  )
};

export default EditProfileModal;