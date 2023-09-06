import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
              Welcome back, please login to your account.
            </Typography>
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <Stack spacing={3}>
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <Button variant="contained" type="submit">
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

export default Login;
