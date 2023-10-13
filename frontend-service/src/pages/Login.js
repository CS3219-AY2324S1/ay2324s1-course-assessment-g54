import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import WavingHandOutlinedIcon from "@mui/icons-material/WavingHandOutlined";

import AcknowledgementToast from "../components/AcknowledgementToast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    document.title = "Login | PeerPrep";  
  }, []);


  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card sx={{ padding: 3, backgroundColor: "transparent" }}>
        <CardContent>
          <Stack spacing={6}>
            <Stack direction="row" spacing={2}>
              <Typography variant="h5" color="skyblue">
                Welcome back, please login to your account.
              </Typography>
              <WavingHandOutlinedIcon sx={{ color: "skyblue" }} />
            </Stack>

            <form
              onSubmit={async (event) => {
                event.preventDefault();
                try {
                  setIsSubmitting(true);
                  const request = await axios.post(
                    `${process.env.REACT_APP_USERS_SERVICE_HOST}/login`,
                    { email, password }
                  );
                  if (request.status !== 200) {
                    setToastOpen(true);
                    return setIsSubmitting(false);
                  }
                  window.localStorage.setItem("token", request.data.token);
                  navigate("/questions");
                } catch (error) {
                  setToastOpen(true);
                  console.error(error);
                  setIsSubmitting(false);
                }
              }}
            >
              <Stack spacing={3}>
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
                <Button
                  sx={{ backgroundColor: "skyblue", color: "black" }}
                  variant="contained"
                  type="submit"
                >
                  Login
                </Button>
                <Typography variant="body2">
                  Don't have an account?{" "}
                  <Link
                    onClick={() => navigate("/signup")}
                    style={{ cursor: "pointer" }}
                  >
                    Sign up
                  </Link>
                </Typography>
              </Stack>
            </form>
          </Stack>
        </CardContent>
      </Card>
      <AcknowledgementToast
        open={toastOpen}
        message="Incorrect email or password."
        onClose={() => setToastOpen(false)}
        severity="error"
      />
    </Box>
  );
};

export default Login;
