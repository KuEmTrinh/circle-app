import React, { useState, useEffect } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Button from "@mui/material/Button";
import { db } from "../../../../../app/firebase";
import { firebase } from "../../../../../app/firebase";
import { arrayUnion } from "firebase/firestore";
import { useSelector } from "react-redux";
import "./Members.css";
function MemberListComponent({ memberList }) {
  const [circleMembers, setCircleMembers] = useState();
  useEffect(() => {
    const regesteringMemberList = [...memberList];
    let filterList = regesteringMemberList.filter((el) => el.status == true);
    setCircleMembers(filterList);
  }, [memberList]);
  return (
    <div className="memberListBox">
      <div className="circleTitleBox">
        {<FiberManualRecordIcon fontSize="small" />}
        <p>メンバーリスト</p>
      </div>
      <div className="memberList">
        {circleMembers ? (
          <>
            {circleMembers.map((el) => {
              return (
                <MemberCardComponent
                  member={el}
                  key={el.id}
                ></MemberCardComponent>
              );
            })}
          </>
        ) : (
          "Loading"
        )}
      </div>
    </div>
  );
}

function MemberCardComponent({ member }) {
  return (
    <div className="memberCard flex">
      <div className="memberCardAvatar">
        <img src={member.userPhotoURL} />
      </div>
      <div className="memberCardInfo">
        <p className="memberCardUsername">{member.userName}</p>
        <p className="memberCardUsercode">{member.userNumber}</p>
        <div className="memberCardTag">
          <p className="memberCardUserrole">
            {member.role == "circleAdmin" ? "会長" : "会員"}
          </p>
        </div>
      </div>
    </div>
  );
}

function MemberJoinListComponent({ memberList, circleId }) {
  const [registerList, setRegisterList] = useState();
  useEffect(() => {
    const regesteringMemberList = [...memberList];
    let filterList = regesteringMemberList.filter((el) => el.status == false);
    setRegisterList(filterList);
  }, [memberList]);

  return (
    <div className="wantToJoinUserBox">
      <div className="circleTitleBox">
        {<FiberManualRecordIcon fontSize="small" />}
        <p>参加したいメンバーリスト</p>
      </div>
      {registerList != "" ? (
        <>
          {registerList.map((el) => {
            return (
              <MemberJoinComponent
                registerMember={el}
                key={el.id}
                circleId={circleId}
              ></MemberJoinComponent>
            );
          })}
        </>
      ) : (
        <p className="circleJoiningText">参加申請人がいません。</p>
      )}
    </div>
  );
}

function MemberJoinComponent({ registerMember, circleId }) {
  let circleName = useSelector((state) => state.circle.name);
  const registerMemberCancel = () => {
    const query = db
      .collection("circle")
      .doc(circleId)
      .collection("member")
      .doc(registerMember.id)
      .delete();
    return query;
  };
  const registerMemberAccept = () => {
    const query = db
      .collection("circle")
      .doc(circleId)
      .collection("member")
      .doc(registerMember.id)
      .update({
        status: true,
      });
    return query;
  };
  const addCircleIdForUser = () => {
    const query = db
      .collection("user")
      .doc(registerMember.userId)
      .update({
        circleList: arrayUnion(circleId),
      });
    return query;
  };
  const createNotification = (message) => {
    const query = db
      .collection("user")
      .doc(registerMember.userId)
      .collection("notification")
      .add({
        message: circleName + "に" + message,
        read: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    return query;
  };
  return (
    <div className="circleJoinMemberList">
      <div className="wantToJoinUser">
        <div className="wantToJoinUserAvatar">
          <img src={registerMember?.userPhotoURL} />
        </div>
        <div className="wantToJoinUserMessageBox">
          <p className="wantToJoinUserName">{registerMember.userName}</p>
          <div className="wantToJoinUserMessage">
            <p className="wantToJoinUserMessageTextBox">
              {registerMember.userMotivation}
            </p>
          </div>
        </div>
      </div>
      <div className="repButtonBox">
        <div className="wrapButton">
          <Button
            variant="outlined"
            onClick={() => {
              registerMemberCancel();
              createNotification("参加できませんでした");
            }}
          >
            <CancelIcon />
            <p className="textOfButton">中止</p>
          </Button>
        </div>
        <Button
          variant="contained"
          onClick={() => {
            registerMemberAccept();
            addCircleIdForUser();
            createNotification("参加出来ました");
          }}
        >
          <CheckCircleIcon />
          <p className="textOfButton">同意</p>
        </Button>
      </div>
    </div>
  );
}

export default function Members({ circleId }) {
  const memberList = useSelector((state) => state.circle.members);
  const isCircleAdmin = useSelector((state) => state.circle.isCircleAdmin);
  return (
    <div className="memberPage">
      {isCircleAdmin ? (
        <MemberJoinListComponent
          memberList={memberList}
          circleId={circleId}
        ></MemberJoinListComponent>
      ) : (
        ""
      )}
      <MemberListComponent memberList={memberList}></MemberListComponent>
    </div>
  );
}
