import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Circle.css";
import ButtonComponent from "../../../../ui/ButtonComponent";
import { db } from "./../../../../../app/firebase";
import { firebase } from "./../../../../../app/firebase";
import Modal from "../../../../ui/Modal";
import TitleText from "../../../../ui/TitleText";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link } from "react-router-dom";
import CircleInfo from "./CircleInfo";

function CircleJoinComponent({ circleId, circleName }) {
  const [circleJoinToggle, setCircleJoinToggle] = useState(false);
  const [circleJoinUseraddress, setCircleJoinUseraddress] = useState("");
  const [circleJoinUserguarantor, setCircleJoinUserguarantor] = useState("");
  const [circleJoinMotivation, setCircleJoinMotivation] = useState("");
  let userInfo = useSelector((state) => state.login.data);
  // console.log(userInfo);
  //function
  const circleJoinConfirm = async () => {
    const query = db
      .collection("circle")
      .doc(circleId)
      .collection("member")
      .add({
        role: "user",
        userId: userInfo.uid,
        userPhotoURL: userInfo.photoURL,
        userName: userInfo.name,
        userNumber: userInfo.userCode,
        userAddress: circleJoinUseraddress,
        userGuarantor: circleJoinUserguarantor,
        userMotivation: circleJoinMotivation,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        status: false,
      });
    setCircleJoinUseraddress("");
    setCircleJoinUserguarantor("");
    setCircleJoinMotivation("");
    setCircleJoinToggle(false);
    return query;
  };

  return (
    <>
      <Modal
        show={circleJoinToggle}
        onClose={() => {
          setCircleJoinToggle(false);
        }}
      >
        <TitleText>参加申請</TitleText>
        <TextField
          disabled
          className="createNewCircleTextField"
          label={circleName}
          inputProps={{ maxLength: 25 }}
        ></TextField>
        <TextField
          disabled
          className="createNewCircleTextField"
          label={userInfo.name}
          inputProps={{ maxLength: 25 }}
        ></TextField>
        <TextField
          disabled
          className="createNewCircleTextField"
          label={userInfo.userCode}
          inputProps={{ maxLength: 25 }}
        ></TextField>
        <TextField
          required
          className="createNewCircleTextField"
          label="住所"
          inputProps={{ maxLength: 100 }}
          value={circleJoinUseraddress}
          onChange={(e) => {
            setCircleJoinUseraddress(e.target.value);
          }}
        ></TextField>
        <TextField
          required
          className="createNewCircleTextField"
          label="保証人氏名"
          inputProps={{ maxLength: 25 }}
          value={circleJoinUserguarantor}
          onChange={(e) => {
            setCircleJoinUserguarantor(e.target.value);
          }}
        ></TextField>
        <TextField
          className="createNewCircleTextField"
          label="志望動機"
          multiline
          rows={4}
          onChange={(e) => {
            setCircleJoinMotivation(e.target.value);
          }}
        ></TextField>
        <div className="circleJoinCircleConfirm center">
          <ButtonComponent
            onClick={() => {
              circleJoinConfirm();
            }}
          >
            参加申請
          </ButtonComponent>
        </div>
      </Modal>
      <div className="circleJoinButton">
        <ButtonComponent
          size="large"
          onClick={() => {
            setCircleJoinToggle(true);
          }}
        >
          参加
        </ButtonComponent>
      </div>
    </>
  );
}

function CircleHomePage({ circleId }) {
  const [dataCircleInfor, setDataCircleInfor] = useState();
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
        const dataInfor = doc.data();
        setDataCircleInfor(dataInfor);
      });
  const memberListOfCircleFromFirebase = async () => {
    const memberData = [];
    db.collection("circle")
      .doc(circleId)
      .collection("member")
      .where("status", "==", true)
      .onSnapshot((querySnapshot) => {
        querySnapshot.docs.map((doc) => {
          memberData.push(doc.data());
        });
      });
    setMemberOfCircle(memberData);
  };
  return (
    <>
      {dataCircleInfor ? (
        <>
          <Link to="/list">
            <div className="backButtonBox">
              <ButtonComponent size="small">
                <div className="backButton">
                  <div className="backButtonIcon">
                    <KeyboardBackspaceIcon fontSize="small"></KeyboardBackspaceIcon>
                  </div>
                  <p>戻る</p>
                </div>
              </ButtonComponent>
            </div>
          </Link>
          <CircleInfo
            circleData={dataCircleInfor}
            memberData={memberOfCircle}
          ></CircleInfo>
          <CircleJoinComponent
            circleId={circleId}
            circleName={dataCircleInfor.name}
          ></CircleJoinComponent>
        </>
      ) : (
        "Loading"
      )}
    </>
  );
}

export default function Circle() {
  let { circleId } = useParams();
  return <CircleHomePage circleId={circleId}></CircleHomePage>;
}
