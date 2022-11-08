import React from "react";
import { useParams } from "react-router-dom";
import { db } from "./../../../../../app/firebase";

function CircleHomePage({ circleId }) {
 console.log(circleId)
 const circleInfor =db.collection("circle").doc(circleId)

console.log(circleInfor)
}
export default function Circle() {
  let { circleId } = useParams();
  return (
    <>
    {circleId?<CircleHomePage circleId={circleId}></CircleHomePage>:""}
      
    </>
  );
}
