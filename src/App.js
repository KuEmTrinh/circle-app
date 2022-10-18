import React from "react";
import "./App.css";
import "./Reset.css";
import { Routes, Route } from "react-router-dom";
import Main from "./component/features/app/main/Main";
function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
