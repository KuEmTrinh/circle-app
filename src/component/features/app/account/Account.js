import React, { useState } from "react";
import Button from "../../../ui/ButtonComponent";
import Modal from "../../../ui/Modal";
import TextField from "@mui/material/TextField";
import "./Account.css";
import TitleText from "../../../ui/TitleText";
import ButtonComponent from "../../../ui/ButtonComponent";
import { db } from "../../../../app/firebase";
import { useSelector } from "react-redux";

export default function Account() {
  let userInfo = useSelector((state) => state.login.data);
  const confirmModal = () => {
    setConfirmToggle(true);
  };
  const [createCircleToggle, setCreateCircleToggle] = useState(false);
  const [confirmToggle, setConfirmToggle] = useState(false);
  const [creatNewCircleInfor, setCreateNewCircleInfor] = useState({
    resgiterUid: userInfo.uid,
    registerUsername: userInfo.displayName,
    registerUserEmail: userInfo.email,
    type: "",
    name: "",
    members: "",
    money: "",
    motivation: "",
    status: false,
  });
  const handleChange = (e) => {
    setCreateNewCircleInfor({
      ...creatNewCircleInfor,
      [e.target.name]: e.target.value,
    });
  };
  const sendInfor = () => {
    const circleInfo = JSON.parse(JSON.stringify(creatNewCircleInfor));
    db.collection("circle").add({ circleInfo });
  };
  return (
    <>
      <Modal
        className="creatNewCircleModal"
        show={createCircleToggle}
        onClose={() => {
          setCreateCircleToggle(false);
        }}
      >
        <TitleText>サークル新規</TitleText>
        <div className="creatNewCircleModalInputBox">
          <TextField
            className="createNewCircleTextField"
            label="種類"
            inputProps={{ maxLength: 25 }}
            name="type"
            onChange={handleChange}
          ></TextField>
          <TextField
            className="createNewCircleTextField"
            label="名前"
            inputProps={{ maxLength: 25 }}
            name="name"
            onChange={handleChange}
          ></TextField>
          <TextField
            className="createNewCircleTextField"
            label="人数"
            type="number"
            name="members"
            onChange={handleChange}
          ></TextField>
          <TextField
            className="createNewCircleTextField"
            label="会費"
            type="number"
            name="money"
            onChange={handleChange}
          ></TextField>
          <TextField
            className="createNewCircleTextField"
            label="志望動機"
            multiline
            rows={4}
            name="motivation"
            onChange={handleChange}
          ></TextField>
        </div>
        <div className="creatNewCircleModalButtonBox">
          <ButtonComponent
            mode="cancel"
            onClick={() => {
              setCreateCircleToggle(false);
            }}
          >
            取り消し
          </ButtonComponent>
          <ButtonComponent
            onClick={() => {
              confirmModal();
            }}
          >
            申請
          </ButtonComponent>
        </div>
      </Modal>
      <Modal
        closeIcon="none"
        show={confirmToggle}
        className="confirmModal"
        onClose={() => {
          setConfirmToggle(false);
        }}
      >
        <p className="subTitle">情報を確認してください！</p>
        <div className="center">
          <ButtonComponent
            onClick={() => {
              sendInfor();
            }}
          >
            確認
          </ButtonComponent>
        </div>
      </Modal>
      <div
        className="center"
        onClick={() => {
          setCreateCircleToggle(true);
        }}
      >
        <Button size="medium">Create new Circle</Button>
      </div>
    </>
  );
}
