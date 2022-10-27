import React, { useState } from "react";
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
  );
}
