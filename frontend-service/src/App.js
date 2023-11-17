import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import EditQuestion from "./pages/EditQuestion";
import Error from "./pages/Error";
import NewQuestion from "./pages/NewQuestion";
import Question from "./pages/Question";
import Questions from "./pages/Questions";

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
    questionTableHeadFont: "#CBD5E0",
    questionRowEven: "rgba(28, 38, 62, 0.7)",
    questionRowOdd: "rgba(28, 38, 62, 1)",
  },
});

const unprotectedRoutes = [
  { path: "/", element: <Navigate to="/questions" replace /> },
  { path: "*", element: <Error /> },
];

const protectedRoutes = [
  { path: "/questions", element: <Questions /> },
  { path: "/questions/new", element: <NewQuestion /> },
  { path: "/questions/:id", element: <Question /> },
  { path: "/questions/:id/edit", element: <EditQuestion /> },
];

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
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
                <>
                  <NavBar />
                  {element}
                </>
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
