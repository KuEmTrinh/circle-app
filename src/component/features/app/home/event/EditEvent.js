import React, { useState } from "react";
import TitleText from "../../../../ui/TitleText";
import { TextField } from "@mui/material";
export default function EditEvent({ editEvent, parentCallback }) {
  const [createNewEventInfor, setCreateNewEventInfor] = useState(editEvent);
  const handleChange = (e) => {
    setCreateNewEventInfor({
      ...createNewEventInfor,
      [e.target.name]: e.target.value,
    });
    sendNewEventInfor();
  };
  const sendNewEventInfor = () => {
    parentCallback(createNewEventInfor);
  };
  return (
    <div className="createNewEvent">
      <TitleText>イベント追加</TitleText>
      <div className="creatNewEventInputBox">
        <TextField
          className="createNewEventTextField"
          label="イベント名"
          inputProps={{ maxLength: 25 }}
          name="name"
          value={createNewEventInfor.name}
          onChange={handleChange}
        ></TextField>
        <TextField
          className="createNewEventTextField"
          label="時間"
          inputProps={{ maxLength: 25 }}
          name="time"
          value={createNewEventInfor.time}
          onChange={handleChange}
        ></TextField>
        <TextField
          className="createNewEventTextField"
          label="場所"
          inputProps={{ maxLength: 25 }}
          name="place"
          value={createNewEventInfor.place}
          onChange={handleChange}
        ></TextField>
        <TextField
          className="createNewEventTextField"
          label="料金"
          inputProps={{ maxLength: 25 }}
          name="money"
          value={createNewEventInfor.money}
          onChange={handleChange}
        ></TextField>
        <TextField
          className="createNewEventTextField"
          label="最大人数"
          inputProps={{ maxLength: 25 }}
          name="maxMembers"
          value={createNewEventInfor.maxMembers}
          onChange={handleChange}
        ></TextField>
        <TextField
          className="createNewEventTextField"
          label="イベント内容"
          inputProps={{ maxLength: 25 }}
          name="content"
          value={createNewEventInfor.content}
          onChange={handleChange}
        ></TextField>
      </div>
    </div>
  );
}
