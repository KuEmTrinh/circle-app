import React from "react";
import Header from "../header/Header";
import Home from "./Home";
import Nav from "../nav/Nav";
export default function Main() {
//   const [user, setUser] = useState(false);
  return (
    <>
      <Header />
      <Home />
      <Nav />
    </>
  );
}
