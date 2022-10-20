import React from "react";
import "./App.css";
import "./Reset.css";
import { Routes, Route } from "react-router-dom";
import Main from "./component/features/app/main/Main";
import MainDashboard from "./component/features/dashboard/main/MainDashboard";
function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/dashboard" element={<MainDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
