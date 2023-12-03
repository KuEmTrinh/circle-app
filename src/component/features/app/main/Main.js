import React, { useEffect } from "react";
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
import NeedLogin from "./NeedLogin";
import NotFound from "./NotFound";
import "./Main.css";

import { useDispatch } from "react-redux";
import { saveLDAPToken } from "../../../slice/loginSlice";

export default function Main() {
  const dispatch = useDispatch();
  useEffect(() => {
    let userTokenInLocalStorage = localStorage.getItem("userToken");
    dispatch(saveLDAPToken(userTokenInLocalStorage));
  }, []);

  let userRole = useSelector((state) => state.login.data.role);
  let userRoleAdmin = [
    "systemAdmin",
    "体育会系",
    "学術文化系",
    "任意団体愛好会",
  ];
  let isSystemAdmin = userRole?.some((role) => userRoleAdmin.includes(role));
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
                  {" "}
                  　
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
