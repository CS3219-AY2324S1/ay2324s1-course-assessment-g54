import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { UserProvider } from "./contexts/UserContext";

import AuthGuard from "./components/AuthGuard";
import Example from "./pages/Example";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Questions from "./pages/Questions";
import Signup from "./pages/Signup";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme();

const useAuthGuard = (component) => <AuthGuard>{component}</AuthGuard>;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Example />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/profile" element={useAuthGuard(<Profile />)} />
            <Route path="/questions" element={useAuthGuard(<Questions />)} />
            <Route path="/auth/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
