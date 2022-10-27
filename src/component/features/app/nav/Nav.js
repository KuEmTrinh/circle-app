import React, { useState } from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import "./Nav.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
const iconNavItemStyles = {
  fontSize: 35,
  color: "#848484",
};

export default function Nav() {
  const [type, setType] = useState("home")
  return (
    <>
      <div className="nav_list">
        <Link
          to="/circle"
          name="circle"
          className="nav_item"
          style={type === "circle" ? { backgroundColor: "#CE476B" } : {}}
          onClick={() => {
            setType("circle");
          }}
        >
          <MenuOutlinedIcon sx={iconNavItemStyles}  style={type === "circle" ? { color: "white" } : {}}/>
          <span className="nav_item--span" style={type === "circle" ? { color: "white" } : {}}>サークル</span>
        </Link>
        <Link
          to="/home"
          name="home"
          className="nav_item"
          style={type === "home" ? { backgroundColor: "#CE476B" } : {}}
          onClick={() => {
            setType("home");
          }}
        >
          <HomeOutlinedIcon sx={iconNavItemStyles}  style={type === "home" ? { color: "white" } : {}}/>
          <span className="nav_item--span"style={type === "home" ? { color: "white" } : {}}>ホーム</span>
        </Link>
        <Link
          to="/account"
          name="account"
          className="nav_item"
          style={type === "account" ? { backgroundColor: "#CE476B" } : {}}
          onClick={() => {
            setType("account");
          }}
        >
          <PermIdentityOutlinedIcon sx={iconNavItemStyles} style={type === "account" ? { color: "white" } : {}}/>
          <span className="nav_item--span"style={type === "account" ? { color: "white" } : {}}>アカウント</span>
        </Link>
        <Link
          to="/notifications"
          name="notifications"
          className="nav_item"
          style={type === "notifications" ? { backgroundColor: "#CE476B" } : {}}
          onClick={() => {
            setType("notifications");
          }}
        >
          <NotificationsOutlinedIcon sx={iconNavItemStyles} style={type === "notifications" ? { color: "white" } : {}}/>
          <span className="nav_item--span"style={type === "notifications" ? { color: "white" } : {}}>通知</span>
        </Link>
      </div>
    </>
=======
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
>>>>>>> 4e7bd47768f493b82cd87087f5b626eaf96b4e9a
  );
}
