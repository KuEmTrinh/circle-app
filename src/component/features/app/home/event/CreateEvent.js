import React, { useState, useEffect } from "react";
import TitleText from "../../../../ui/TitleText";
import { FormControl } from "react-bootstrap";
import { InputLabel, TextField } from "@mui/material";
import "./CreateEvent.css";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import imageCompression from "browser-image-compression";
export default function CreateEvent(props) {
  const [createNewEventInfor, setCreateNewEventInfor] = useState({
    name: "",
    time: "",
    place: "",
    money: "",
    maxMembers: "",
    content: "",
  });
  const handleChange = (e) => {
    setCreateNewEventInfor({
      ...createNewEventInfor,
      [e.target.name]: e.target.value,
    });
    sendNewEventInfor();
  };
  const sendNewEventInfor = () => {
    props.parentCallback(createNewEventInfor);
  };
  const [percent, setPercent] = useState(0);
  const [resultBox, setResultBox] = useState(false);
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!props.file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(props.file);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [props.file]);
  const handleChangeImage = async (event) => {
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 400,
      useWebWorker: true,
    };
    try {
      const file = event.target.files[0];
      const compressedFile = await imageCompression(file, options);
      props.setFile(compressedFile);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="createNewEvent">
      <TitleText>イベント追加</TitleText>
      <div className="creatNewEventInputBox">
        {preview ? (
          <div className="circleImagePreview">
            {props.file && <img src={preview} />}
          </div>
        ) : (
          ""
        )}
        <TextField
          className="createNewEventTextField"
          label="イベント名"
          inputProps={{ maxLength: 25 }}
          name="name"
          onChange={handleChange}
        ></TextField>
        <TextField
          className="createNewEventTextField"
          label="時間"
          inputProps={{ maxLength: 25 }}
          name="time"
          onChange={handleChange}
        ></TextField>
        <TextField
          className="createNewEventTextField"
          label="場所"
          inputProps={{ maxLength: 25 }}
          name="place"
          onChange={handleChange}
        ></TextField>
        <TextField
          className="createNewEventTextField"
          label="料金"
          inputProps={{ maxLength: 25 }}
          name="money"
          onChange={handleChange}
        ></TextField>
        <TextField
          className="createNewEventTextField"
          label="最大人数"
          inputProps={{ maxLength: 25 }}
          name="maxMembers"
          onChange={handleChange}
        ></TextField>
        <TextField
          className="createNewEventTextField"
          label="イベント内容"
          inputProps={{ maxLength: 25 }}
          name="content"
          onChange={handleChange}
        ></TextField>
      </div>
      <div className="inputBox">
        <label for="accountSettingInput">
          <div className="accountSettingInputUpload">
            <div className="imageInputTitle">
              <FileUploadIcon></FileUploadIcon>
              <p>写真を選択</p>
            </div>
            <input
              className="inputSetting"
              onChange={handleChangeImage}
              id="accountSettingInput"
              type="file"
            ></input>
          </div>
        </label>
      </div>
    </div>
  );
}
