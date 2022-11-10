import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import "./Circle.css";

import { db } from "./../../../../../app/firebase";

function CircleHomePage({ circleId }) {
  const [dataCircleInfor, setDataCircleInfor] = useState({});
  const [memberOfCircle, setMemberOfCircle] = useState([]);
  useEffect(() => {
    circleInforFromFirebase();
    memberListOfCircleFromFirebase();
  }, []);
  const circleInforFromFirebase = async () =>
    db
      .collection("circle")
      .doc(circleId)
      .get()
      .then((doc) => {
        const dataInfor = {
          name: doc.data().name,
          type: doc.data().type,
        };
        setDataCircleInfor(dataInfor);
      });
  const memberListOfCircleFromFirebase = async () => {
    const memberData = [];
    db.collection("circle")
      .doc(circleId)
      .collection("member")
      .onSnapshot((querySnapshot) => {
        querySnapshot.docs.map((doc) => {
          memberData.push(doc.data());
        });
      });
    setMemberOfCircle(memberData);
    
  };

  return (
    <>
      <div className="circleDeatailsBox">
        <h1 className="circleName">{dataCircleInfor.name}</h1>
        <div className="circleImageBox">
          <ul>
            {/* <li>
              <img
                className="circleImage"
                src="https://images.unsplash.com/photo-1511268594014-0e9d3ea5c33e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              ></img>
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1511268594014-0e9d3ea5c33e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"></img>
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1511268594014-0e9d3ea5c33e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"></img>
            </li> */}
           
            
          </ul>
        </div>
        <div className="circleMemberBox">
          <div className="circleTitleBox">
            {<FiberManualRecordIcon fontSize="small" />}
            <p>サークル会員</p>
          </div>
          <div className="circleMemberList">
            <div className="circleMemberItem">
            {memberOfCircle ? (
              <>
                {memberOfCircle.map((member) => {
                
                   
                   return <>  <Avatar src={member.userPhotoURL} />
                   <p>{member.userName}</p>
                   </>
                  
                })}
              </>
            ) : (
              ""
            )}
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default function Circle() {
  let { circleId } = useParams();
  return (
    <>
      <CircleHomePage circleId={circleId}></CircleHomePage>
    </>
  );
}
