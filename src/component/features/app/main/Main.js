import React from "react";
import Nav from "../nav/Nav";
import List from "../list/List";
import Header from "../header/Header";
import Home from "../home/Home";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Account from "../account/Account";
import Chat from "../home/chat/Chat";
import MainDashboard from "../../dashboard/main/MainDashboard";
import Circle from "./../list/circle/Circle";
import CircleHome from "../home/CircleHome";
import Notifi from "../notifi/Notifi";
import Update from "./Update";
function NeedLogin() {
  return (
    <>
      <p>You are should login</p>
    </>
  );
}
function NotFound() {
  return (
    <>
      <p>Page not found</p>
    </>
  );
}

export default function Main() {
  let userRole = useSelector((state) => state.login.data.role);
  let isSystemAdmin = userRole?.includes("systemAdmin");
  //   const [user, setUser] = useState(false);
  const loginStatus = useSelector((state) => state.login.login);
  const userInfo = useSelector((state) => state.login.data);
  return (
    <>
      <Header />
      <Routes>
        {loginStatus ? (
          <>
            {userInfo?.registed ? (
              <>
                <Route path="/">
                  <Route path="list" element={<List />} />
                  <Route
                    path="list/:circleId/circle_details"
                    element={<Circle />}
                  />
                  <Route
                    index
                    element={isSystemAdmin ? <MainDashboard /> : <Home />}
                  />
                  <Route path="account" element={<Account />} />
                  <Route path="notifi" element={<Notifi />} />
                  <Route path="chat/:circleId" element={<Chat />} />
                  <Route
                    path=":circleId/:circleName/circle_home"
                    element={<CircleHome />}
                  />
                </Route>
                <Route path="*" element={<NotFound />} />
              </>
            ) : (
              <>
                <Route path="*" element={<Update userInfo={userInfo} />} />
              </>
            )}
          </>
        ) : (
          <>
            <Route path="/" element={<NeedLogin />} />
            <Route path="/list" element={<List />} />
            <Route path="list/:circleId/circle_details" element={<Circle />} />
            <Route path="*" element={<NeedLogin />} />
          </>
        )}
      </Routes>
      <Nav />
    </>
  );
}
