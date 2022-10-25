import React, { useState, useEffect } from "react";
import "./List.css";
import PeopleIcon from "@mui/icons-material/People";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";

function CircleItem() {
  return (
    <div className="circleElementBox">
      <div className="circleImage">
        <p className="circleElementTitle">サッカーサークル</p>
      </div>
      <div className="iconBox">
        <div className="iconItem">
          <PeopleIcon fontSize="small" color="action" />
          <p>4</p>
        </div>
        <div className="iconItem">
          <ThumbUpIcon fontSize="small" color="action" />
          <p>32</p>
        </div>
        <div className="iconItem">
          <MarkChatUnreadIcon fontSize="small" color="action" />
          <p>5</p>
        </div>
      </div>
    </div>
  );
}

function CircleCategory() {
  return (
    <>
      <p className="circleTitle">新しサークル</p>
      <div className="circleElementList">
        <CircleItem />
        <CircleItem />
        <CircleItem />
        <CircleItem />
        <CircleItem />
      </div>
    </>
  );
}

export default function List() {
  return <div className="listBox">
    <CircleCategory/>
    <CircleCategory/>
    <CircleCategory/>
    <CircleCategory/>
    <CircleCategory/>
  </div>;
}
