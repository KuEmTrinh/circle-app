import React from "react";
import "./App.css";
import "./Reset.css";
<<<<<<< HEAD
// import { BrowserRouter, Routes, Route } from "react-router-dom";
=======
>>>>>>> 4e7bd47768f493b82cd87087f5b626eaf96b4e9a
import Main from "./component/features/app/main/Main";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: "#C13450",
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#11cb5f",
      },
      whiteColor: {
        // This is green.A700 as hex.
        main: "#fff",
      },
    },
  });
  return (
    <div className="app">
<<<<<<< HEAD
      <Main />
=======
      <ThemeProvider theme={theme}>
        <Main></Main>
      </ThemeProvider>
>>>>>>> 4e7bd47768f493b82cd87087f5b626eaf96b4e9a
    </div>
  );
}

export default App;
