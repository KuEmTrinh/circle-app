import React, { useState } from "react";
import Button from "../../../ui/ButtonComponent";
import Modal from "../../../ui/Modal";
import TextField from "@mui/material/TextField";
import "./Account.css";
import TitleText from "../../../ui/TitleText";
export default function Account() {
  const [createCircleToggle, setCreateCircleToggle] = useState(false);
  return (
    <>
    <p>Test</p>
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
            type='number'
          ></TextField>
          <TextField
            className="createNewCircleTextField"
            label="会費"
            type='number'
          ></TextField>
           <TextField
            className="createNewCircleTextField"
            label="志望動機"
            multiline
            rows={4}
          ></TextField>
           

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
