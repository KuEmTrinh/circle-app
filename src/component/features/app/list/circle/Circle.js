import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Circle.css";
import ButtonComponent from "../../../../ui/ButtonComponent";
import { db } from "./../../../../../app/firebase";
import Modal from "../../../../ui/Modal";
import TitleText from "../../../../ui/TitleText";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link } from "react-router-dom";
import CircleInfo from "./CircleInfo";

function CircleJoinComponent({ circleId }) {
  const [circleJoinToggle, setCircleJoinToggle] = useState(false);
  const [circleJoinUsername, setCircleJoinUsername] = useState("");
  const [circleJoinUsernumber, setCircleJoinUsernumber] = useState("");
  const [circleJoinUseraddress, setCircleJoinUseraddress] = useState("");
  const [circleJoinUserguarantor, setCircleJoinUserguarantor] = useState("");
  const [circleJoinUserorganizationname, setCircleJoinUserorganizationname] = useState("");
  const [circleJoinUserjoiningdate, setCircleJoinUserjoiningdate] = useState("");
  const [circleJoinMotivation, setCircleJoinMotivation] = useState("");
  let userInfo = useSelector((state) => state.login.data);
  console.log(userInfo);
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
        userName: circleJoinUsername,
        userNumber: circleJoinUsernumber,
        useraddress: circleJoinUseraddress,
        userguarantor: circleJoinUserguarantor,
        userorganizationname: circleJoinUserorganizationname,
        userjoiningdate: circleJoinUserjoiningdate,
        userMotivation: circleJoinMotivation,
        status: false,
      });
    setCircleJoinUsername("");
    setCircleJoinUsernumber("");
    setCircleJoinUseraddress("");
    setCircleJoinUserguarantor("");
    setCircleJoinUserorganizationname("");
    setCircleJoinUserjoiningdate("");
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
          className="createNewCircleTextField"
          label="名前"
          inputProps={{ maxLength: 25 }}
          value={circleJoinUsername}
          onChange={(e) => {
            setCircleJoinUsername(e.target.value);
          }}
        ></TextField>
        <TextField
          className="createNewCircleTextField"
          label="学籍番号"
          inputProps={{ maxLength: 25 }}
          value={circleJoinUsernumber}
          onChange={(e) => {
            setCircleJoinUsernumber(e.target.value);
          }}
        ></TextField>
         <TextField
          className="createNewCircleTextField"
          label="住所"
          inputProps={{ maxLength: 25 }}
          value={circleJoinUseraddress}
          onChange={(e) => {
            setCircleJoinUseraddress(e.target.value);
          }}
        ></TextField>
        <TextField
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
          label="団体名"
          inputProps={{ maxLength: 25 }}
          value={circleJoinUserorganizationname}
          onChange={(e) => {
            setCircleJoinUserorganizationname(e.target.value);
          }}
        ></TextField>
        <TextField
          className="createNewCircleTextField"
          label="入部日"
          inputProps={{ maxLength: 25 }}
          value={circleJoinUserjoiningdate}
          onChange={(e) => {
            setCircleJoinUserjoiningdate(e.target.value);
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
  return (
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
      <CircleInfo circleId={circleId}></CircleInfo>
      <CircleJoinComponent circleId={circleId}></CircleJoinComponent>
    </>
  );
}

export default function Circle() {
  let { circleId } = useParams();
  return <CircleHomePage circleId={circleId}></CircleHomePage>;
}
