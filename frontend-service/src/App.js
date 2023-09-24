import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { UserProvider } from "./contexts/UserContext";

import AuthGuard from "./components/AuthGuard";
import EditQuestion from "./pages/EditQuestion";
import Example from "./pages/Example";
import Login from "./pages/Login";
import NewQuestion from "./pages/NewQuestion";
import Question from "./pages/Question";
import Questions from "./pages/Questions";
import Signup from "./pages/Signup";
import Matchmaking from "./pages/MatchmakingLoading";
import NavBar from "./components/NavBar";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme();

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#444654",
    },
    secondary: {
      main: "#494c7d"
    },
    background: {
      default: '#141C2F'
    },
    
  },
})
console.log(darkTheme);

const unprotectedRoutes = [
  { path: "/", element: <Example /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
];

const protectedRoutes = [
  { path: "/questions", element: <Questions /> },
  { path: "/questions/new", element: <NewQuestion /> },
  { path: "/questions/:id", element: <Question /> },
  { path: "/questions/:id/edit", element: <EditQuestion /> },
  { path: "/matchmaking", element: <Matchmaking /> },
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
                element={<AuthGuard>
                          <NavBar/>
                          {element}
                        </AuthGuard>}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
