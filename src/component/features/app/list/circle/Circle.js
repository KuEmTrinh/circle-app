import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CarouselSlide from "../../../../ui/CarouselSlide";
import { db } from "./../../../../../app/firebase";


function CircleHomePage({ circleId }) {
  const [dataCircleInfor, setDataCircleInfor] = useState({})
  const circleInforFromFirebase = async () => db.collection("circle").doc(circleId).get().then((doc) => {
    const dataInfor = {
      name: doc.data().name,
      type: doc.data().type
    }
    setDataCircleInfor(dataInfor)
  })
  circleInforFromFirebase();

  return <>
    <div>
      <h1 className="circleName">{dataCircleInfor.name}</h1>
      <div>
        <CarouselSlide/>
      </div>
    </div>
  </>

}
export default function Circle() {
  let { circleId } = useParams();
  return (
    <>
      <CircleHomePage circleId={circleId}></CircleHomePage>

    </>
  );
}
