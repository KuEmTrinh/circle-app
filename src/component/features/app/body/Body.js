import React from "react";
import { Routes, Route } from "react-router-dom";
import Circle from "../circle/List";
import Home from "../home/Home";
import Account from "../account/Account";
import Notifications from "../notifications/Notifications";
import NoPage from "../no-page/NoPage";
export default function Body() {
  return (
    
      <Routes>
         <Route path="/" element={<Home />} />
        <Route path="/circle" element={<Circle />} />
        <Route path="/home" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/*" element={<NoPage />} />
      </Routes>
    
  );
}
