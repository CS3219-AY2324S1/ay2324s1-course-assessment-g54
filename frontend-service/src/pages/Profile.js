import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { useState } from 'react';

const Profile = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@gmail.com");
  const [inputName, setInputName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setName(inputName);
    setIsEditing(false);
  }

  function handleCancelClick() {
    setIsEditing(false);
  }

  const viewingCard = (
    <Card sx={{minWidth: '510px', textAlign: 'center', p: 1, borderRadius: 1, position: 'relative'}}>
      <Stack sx={{mb: '20px'}} direction="row" spacing={1} alignItems="center" justifyContent="center">
        <Typography variant="h4" sx={{fontSize: '20px'}}>User Profile</Typography>
        <IconButton onClick={handleEditClick} sx={{position: "absolute", right: 0}}>
          <EditIcon/>
        </IconButton>
      </Stack>
      <Stack spacing={6}>
        <Stack direction="row" spacing={1} alignItems="center" >
          <Typography variant="body1" sx={{fontWeight: '600'}}>Name</Typography>
          <Typography variant="body1">{name}</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center" >
          <Typography variant="body1" sx={{fontWeight: '600', marginRight: '80px'}}>Email</Typography>
          <Typography variant="body1">{email}</Typography>
        </Stack>
      </Stack>
    </Card>
  );

  const editingCard = (
    <form onSubmit={handleSubmit}>
      <Card sx={{minWidth: '510px', textAlign: 'center', p: 1,  borderRadius: 1, position: 'relative'}}>
        <Stack  sx={{mb: '20px'}} direction="row" spacing={1} alignItems="center" justifyContent="center">
          <Typography variant="h4" sx={{fontSize: '20px' }}>Editing Profile</Typography>
          <IconButton type='submit' sx={{position: "absolute", right: 0}}>
            <DoneIcon/>
          </IconButton>
          <IconButton onClick={handleCancelClick} sx={{position: "absolute", right: 30}}>
            <CloseIcon/>
          </IconButton>
        </Stack>
        <Stack spacing={3}>
          <Stack direction="row" spacing={1} alignItems="center" >
            <Typography variant="body1" sx={{fontWeight: '600'}}>Name</Typography>
            <TextField defaultValue={name} sx={{flex: '1 1 auto'}} variant="outlined" onChange={(e) => setInputName(e.target.value)}/>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center" >
            <Typography variant="body1" sx={{fontWeight: '600'}}>Email</Typography>
            <TextField disabled defaultValue={email} sx={{flex: '1 1 auto'}} variant="outlined" onChange={(e) => setInputName(e.target.value)}/>
          </Stack>
        </Stack>
      </Card>
    </form>
  );

  return (
    <Box display="flex" height="100vh" alignItems="center" justifyContent="Center">
      {isEditing ? editingCard : viewingCard}
    </Box>
  );
};

export default Profile;
