import React from "react";
import Nav from "../nav/Nav";
import Home from "./Home";
import List from "../list/List";
import Header from "../header/Header";
import { Routes, Route } from "react-router-dom";
export default function Main() {
  //   const [user, setUser] = useState(false);
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/">
          <Route index element={<Home/>}/>
          <Route path="list" element={<List/>}/>
        </Route>
      </Routes>
      <Nav/>
    </>
  );
}
