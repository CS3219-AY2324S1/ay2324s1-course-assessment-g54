import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { UserProvider } from "./contexts/UserContext";

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Example />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/auth/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
