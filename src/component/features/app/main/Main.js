import React from "react";
import Nav from "../nav/Nav";
import List from "../list/List";
import Header from "../header/Header";
import Home from "../home/Home";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Account from "../account/Account";
import Chat from "../home/chat/Chat";
function NeedLogin() {
  return (
    <>
      <p>You are should login</p>
    </>
  );
}

export default function Main() {
  //   const [user, setUser] = useState(false);
  const loginStatus = useSelector((state) => state.login.login);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/">
          <Route path="list" element={<List />} />

          {loginStatus ? (
            <>
              <Route index element={<Home />} />
              <Route path="account" element={<Account />} />
              <Route path="chat/:circleId" element={<Chat />} />
            </>
          ) : (
            <Route path="*" element={<NeedLogin />} />
          )}
        </Route>
      </Routes>
      <Nav />
    </>
  );
}
