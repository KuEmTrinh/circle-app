import React, { useState, useEffect } from "react";
import TitleText from "../../../../ui/TitleText";
import { FormControl } from "react-bootstrap";
import { InputLabel, TextField } from "@mui/material";
import dayjs from "dayjs";
import "./CreateEvent.css";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import imageCompression from "browser-image-compression";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
export default function CreateEvent(props) {
  const handleTimer = async (e) => {
    let item = await { ...createNewEventInfor };
    item.time = e;
    await setCreateNewEventInfor(item);
    await sendNewEventInfor();
  };
  const [createNewEventInfor, setCreateNewEventInfor] = useState({
    name: "",
    time: dayjs(new Date()),
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
        <Stack spacing={2} sx={{ width: 1 }}>
          <TextField
            className="createNewEventTextField"
            label="イベント名"
            inputProps={{ maxLength: 25 }}
            name="name"
            onChange={handleChange}
          ></TextField>
          {/* <TextField
          className="createNewEventTextField"
          label="時間"
          inputProps={{ maxLength: 25 }}
          name="time"
          onChange={handleChange}
        ></TextField> */}
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            sx={{ width: "100%" }}
          >
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/DD/YYYY"
              name="time"
              value={createNewEventInfor.time}
              onChange={handleTimer}
              renderInput={(params) => <TextField {...params} />}
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
          <TextField
            className="createNewEventTextField"
            label="場所"
            inputProps={{ maxLength: 25 }}
            name="place"
            onChange={handleChange}
            fullWidth
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
        </Stack>
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
