import React, { useState } from "react";
import Button from "../../../ui/ButtonComponent";
import Modal from "../../../ui/Modal";
import TextField from "@mui/material/TextField";
import "./Account.css";
import TitleText from "../../../ui/TitleText";
import ButtonComponent from "../../../ui/ButtonComponent";

export default function Account() {
  const confirmModal = () => {
    setConfirmToggle(true);
  };
  const [createCircleToggle, setCreateCircleToggle] = useState(false);
  const [confirmToggle, setConfirmToggle] = useState(false);
  return (
    <>
      <Modal closeIcon="none"
        className="confirmModal"
        show={confirmToggle}
        // onClose={() => {
        //   setConfirmToggle(false);
        // }}
      >
        Confirm Modal
      </Modal>
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
          ></TextField>
          <TextField
            className="createNewCircleTextField"
            label="名前"
            inputProps={{ maxLength: 25 }}
          ></TextField>
          <TextField
            className="createNewCircleTextField"
            label="人数"
            type="number"
          ></TextField>
          <TextField
            className="createNewCircleTextField"
            label="会費"
            type="number"
          ></TextField>
          <TextField
            className="createNewCircleTextField"
            label="志望動機"
            multiline
            rows={4}
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
