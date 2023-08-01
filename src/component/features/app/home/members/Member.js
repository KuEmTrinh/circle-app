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
      {registerList ? (
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
        ""
      )}
    </div>
  );
}

function MemberJoinComponent({ registerMember, circleId }) {
  const circleName = useSelector((state) => state.circle.name);
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
        circleId: circleId,
        circleName: circleName,
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
          onClick={async () => {
            await registerMemberAccept();
            await addCircleIdForUser();
            await createNotification("参加出来ました");
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
  const [memberList, setMemberList] = useState("");

  //useEffect
  useEffect(() => {
    fetchCircleMemberData();
  }, []);

  //function
  const fetchCircleMemberData = () => {
    const query = db
      .collection("circle")
      .doc(circleId)
      .collection("member")
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.docs.map((doc) => {
          let item = doc.data();
          item.id = doc.id;
          data.push(item);
        });
        setMemberList(data);
      });
    return query;
  };
  return (
    <div className="memberPage">
      <MemberJoinListComponent
        memberList={memberList}
        circleId={circleId}
      ></MemberJoinListComponent>
      <MemberListComponent memberList={memberList}></MemberListComponent>
    </div>
  );
}
