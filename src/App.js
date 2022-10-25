import React from "react";
import "./App.css";
import "./Reset.css";
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
      <ThemeProvider theme={theme}>
        <Main></Main>
      </ThemeProvider>
    </div>
  );
}

export default App;
