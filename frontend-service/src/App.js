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

const unprotectedRoutes = [
  { path: "/", element: <Example /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
];

const protectedRoutes = [
  { path: "/profile", element: <Profile /> },
  { path: "/questions", element: <Questions /> },
];

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <BrowserRouter>
          <Routes>
            {unprotectedRoutes.map(({ element, path }) => (
              <Route path={path} element={element} />
            ))}
            {protectedRoutes.map(({ element, path }) => (
              <Route path={path} element={<AuthGuard>{element}</AuthGuard>} />
            ))}
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
