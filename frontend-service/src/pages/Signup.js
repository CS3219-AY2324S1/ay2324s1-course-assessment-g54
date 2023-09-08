import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSamePassword = password === confirmPassword;

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card sx={{ padding: 3 }}>
        <CardContent>
          <Stack spacing={6}>
            <Typography variant="h5" color="grey">
              Welcome, please sign up for an account.
            </Typography>
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                if (!isSamePassword) return;
                try {
                  setIsSubmitting(true);
                  const request = await axios.post(
                    `${process.env.REACT_APP_USERS_SERVICE_HOST}/signup`,
                    { name, email, password }
                  );
                  if (request.status !== 200) return setIsSubmitting(false);
                  navigate("/login");
                } catch (error) {
                  console.error(error);
                  setIsSubmitting(false);
                }
              }}
            >
              <Stack spacing={3}>
                <TextField
                  label="Name"
                  variant="outlined"
                  type="name"
                  required
                  disabled={isSubmitting}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  required
                  disabled={isSubmitting}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  required
                  disabled={isSubmitting}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  required
                  disabled={isSubmitting}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  error={!isSamePassword}
                  helperText={!isSamePassword ? "Passwords do not match." : ""}
                />
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signup;
