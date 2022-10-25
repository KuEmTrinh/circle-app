import React, { useState } from "react";
import "./Nav.css";
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Outlet, Link } from "react-router-dom";
function ActiveLink() {
  return <div className="selectedLink"></div>;
}
export default function Nav() {
  const [selected, setSelected] = useState("");
  return (
    <div className="navBox">
      <div className="navBar">
        <div className="navBarIcon">
          {selected == "" ? <ActiveLink /> : ""}
          <Link
            to="/"
            onClick={() => {
              setSelected("");
            }}
          >
            <HomeIcon color="whiteColor" fontSize="large" />
          </Link>
        </div>
        <div className="navBarIcon">
          {selected == "list" ? <ActiveLink /> : ""}
          <Link
            to="/list"
            onClick={() => {
              setSelected("list");
            }}
          >
            <FormatListBulletedIcon color="whiteColor" fontSize="large" />
          </Link>
        </div>
        <div className="navBarIcon">
          {selected == "account" ? <ActiveLink /> : ""}
          <Link
            to="/account"
            onClick={() => {
              setSelected("account");
            }}
          >
            <ManageAccountsIcon color="whiteColor" fontSize="large" />
          </Link>
        </div>
        <div className="navBarIcon">
          {selected == "notification" ? <ActiveLink /> : ""}
          <Link
            to="/notification"
            onClick={() => {
              setSelected("notification");
            }}
          >
            <NotificationsIcon color="whiteColor" fontSize="large" />
          </Link>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
