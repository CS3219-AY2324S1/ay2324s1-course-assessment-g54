import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { UserProvider } from "./contexts/UserContext";

import AuthGuard from "./components/AuthGuard";
import EditQuestion from "./pages/EditQuestion";
import Login from "./pages/Login";
import NewQuestion from "./pages/NewQuestion";
import Question from "./pages/Question";
import Questions from "./pages/Questions";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import Matchmaking from "./pages/Matchmaking";
import MatchmakingFind from "./pages/MatchmakingFind";
import NavBar from "./components/NavBar";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "rgba(20, 28, 47, 1)",
      navBar: "rgba(5, 16, 43, 1)",
      light: "rgba(28, 38, 62, 1)",
    },
    navbarButtonSelected: "rgba(66, 165, 245, 1)",
    navbarButtonHover: "rgba(66, 165, 245, 0.7)",
    questionRowHover: "rgba(66, 165, 245, 0.7)",
    questionTableHead: "rgba(28, 38, 62, 1)",
    questionRowEven: "rgba(28, 38, 62, 0.8)",
    questionRowOdd: "rgba(28, 38, 62, 1)",
  },
});

const unprotectedRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "*", element: <Error /> },
];

const protectedRoutes = [
  { path: "/questions", element: <Questions /> },
  { path: "/questions/new", element: <NewQuestion /> },
  { path: "/questions/:id", element: <Question /> },
  { path: "/questions/:id/edit", element: <EditQuestion /> },
  { path: "/matchmaking", element: <Matchmaking /> },
  { path: "/matchmaking/find", element: <MatchmakingFind /> },
];

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <UserProvider>
        <BrowserRouter>
          <Routes>
            {unprotectedRoutes.map(({ element, path }) => (
              <Route key={path} path={path} element={element} />
            ))}
            {protectedRoutes.map(({ element, path }) => (
              <Route
                key={path}
                path={path}
                element={
                  <AuthGuard>
                    <NavBar />
                    {element}
                  </AuthGuard>
                }
              />
            ))}
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
