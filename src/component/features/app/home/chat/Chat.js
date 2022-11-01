import React from "react";
import { useParams } from "react-router-dom";

function ChatRoom() {
  return <p>ChatRoom</p>;
}

export default function Chat() {
  let { circleId } = useParams();
  return <>{circleId ? <ChatRoom/> : ""}</>;
}
