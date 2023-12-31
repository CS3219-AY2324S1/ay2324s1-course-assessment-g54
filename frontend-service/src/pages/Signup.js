import axios, { AxiosError } from "axios";
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

import AcknowledgementToast from "../components/AcknowledgementToast";
import Page from "../components/Page";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(false);

  const isSamePassword = password === confirmPassword;

    return (
    <Page title="Sign Up">
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Card sx={{ padding: 3, backgroundColor: "transparent" }}>
          <CardContent>
            <Stack spacing={6}>
              <Typography variant="h5" color="skyblue">
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
                    if (error instanceof AxiosError) {
                      setToastMessage(error.response.data);
                      setIsToastOpen(true);
                    }
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
                    helperText={
                      !isSamePassword ? "Passwords do not match." : ""
                    }
                  />
                  <Button
                    sx={{ backgroundColor: "skyblue", color: "black" }}
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Sign Up
                  </Button>
                  <Typography variant="body2">
                    Already have an account?{" "}
                    <Link
                      onClick={() => navigate("/login")}
                      style={{ cursor: "pointer" }}
                    >
                      Login
                    </Link>
                  </Typography>
                </Stack>
              </form>
            </Stack>
          </CardContent>
        </Card>
      </Box>
      <AcknowledgementToast
        message={toastMessage}
        onClose={() => setIsToastOpen(false)}
        open={isToastOpen}
        severity="error"
      />
      </Page>
  );
};

export default Signup;
