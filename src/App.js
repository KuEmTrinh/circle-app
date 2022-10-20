import React from "react";
import "./App.css";
import "./Reset.css";
import { Routes, Route } from "react-router-dom";
import Main from "./component/features/app/main/Main";
import MainDashboard from "./component/features/dashboard/main/MainDashboard";
import List from "./component/features/app/list/List";
function App() {
  return (
    <div className="app">
      <Main></Main>
    </div>
  );
}

export default App;
