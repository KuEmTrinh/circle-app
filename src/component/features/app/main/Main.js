import React from "react";
<<<<<<< HEAD
import Header from "../header/Header";
import Body from "../body/Body";
=======
>>>>>>> 4e7bd47768f493b82cd87087f5b626eaf96b4e9a
import Nav from "../nav/Nav";
import Home from "./Home";
import List from "../list/List";
import Header from "../header/Header";
import { Routes, Route } from "react-router-dom";
export default function Main() {
  //   const [user, setUser] = useState(false);
  return (
    <>
<<<<<<< HEAD
      <Header />
      <Body/>
      <Nav />
=======
      <Header/>
      <Routes>
        <Route path="/">
          <Route index element={<Home/>}/>
          <Route path="list" element={<List/>}/>
        </Route>
      </Routes>
      <Nav/>
>>>>>>> 4e7bd47768f493b82cd87087f5b626eaf96b4e9a
    </>
  );
}
