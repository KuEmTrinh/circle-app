import React, { useState } from "react";
import Button from "../../../ui/ButtonComponent";
import Modal from "../../../ui/Modal";
import TextField from '@mui/material/TextField';
import "./Account.css";
export default function Account() {
  const [createCircleToggle, setCreateCircleToggle] = useState(false);
  return (
    <>
      <Modal
        show={createCircleToggle}
        onClose={()=>{setCreateCircleToggle(false)}}
      >
        <TextField label="Required"></TextField>
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
