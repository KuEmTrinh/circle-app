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
  // const [isActive,setIsActive]=useState(false);
  // const handleClick=()=>{
  //   setIsActive(current=>!current)
  // }
  const tabs = ["cricle", "home", "account", "notifications"];
  const icon = [
    MenuOutlinedIcon,
    HomeOutlinedIcon,
    PermIdentityOutlinedIcon,
    NotificationsOutlinedIcon,
  ];
  const [type, setType] = useState("home");
  return (
    <>
      {/* <div className="nav_list">
      {tabs.map((tab,index)=>{
         <Link
         to={`/${tab}`}
         name={tab}
         className="nav_item"
         style={type=="tab"?{backgroundColor:"red"}:{}}
         onClick={() => {
           setType(tab);
         }}
       >
         {icon[index]} sx={iconNavItemStyles} 
         <span class="nav_item--span">サークル</span>
       </Link>
      })}
    </div> */}

      <div>{type}</div>
      <div className="nav_list">
        <Link
          to="/circle"
          name="circle"
          className="nav_item"
          style={type == "circle" ? { backgroundColor: "red" } : {}}
          onClick={() => {
            setType("circle");
          }}
        >
          <MenuOutlinedIcon sx={iconNavItemStyles} />
          <span class="nav_item--span">サークル</span>
        </Link>
        <Link
          to="/home"
          name="home"
          className="nav_item"
          onClick={() => {
            setType("home");
          }}
        >
          <HomeOutlinedIcon sx={iconNavItemStyles} />
          <span class="nav_item--span">ホーム</span>
        </Link>
        <Link
          to="/account"
          name="account"
          className="nav_item"
          onClick={() => {
            setType("account");
          }}
        >
          <PermIdentityOutlinedIcon sx={iconNavItemStyles} />
          <span class="nav_item--span">アカウント</span>
        </Link>
        <Link
          to="/notifications"
          name="notifications"
          className="nav_item"
          onClick={() => {
            setType("notifications");
          }}
        >
          <NotificationsOutlinedIcon sx={iconNavItemStyles} />
          <span class="nav_item--span">通知</span>
        </Link>
      </div>
    </>
  );
}
