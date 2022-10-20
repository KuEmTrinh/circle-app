import React from "react";
import Header from "../header/Header";
import Home from "./Home";
import Nav from "../nav/Nav";
import List from "../list/List";
import { Routes, Route } from "react-router-dom";
export default function Main() {
//   const [user, setUser] = useState(false);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
      </Routes>
      {/* <Nav /> */}
    </>
  );
}
