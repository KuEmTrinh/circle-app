import React, { useState } from "react";
import Modal from "../../../ui/Modal";
import TitleText from "../../../ui/TitleText";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { db } from "../../../../app/firebase";
import Button from "@mui/material/Button";
export default function Update({ userInfo }) {
  const userId = userInfo.uid;
  const [name, setName] = useState(userInfo.name);
  const [userCode, setUserCode] = useState(userInfo.userCode);
  const [userFaculty, setUserFaculty] = useState(userInfo.userFaculty);
  const [sex, setSex] = useState(userInfo.sex);
  const [userPhone, setUserPhone] = useState(userInfo.userPhone);

  const userInfoConfirm = () => {
    const query = db.collection("user").doc(userId).update({
      name: name,
      userCode: userCode,
      userFaculty: userFaculty,
      sex: sex,
      userPhone: userPhone,
      registed: true,
    });
    return query;
  };
  return (
    <Modal show={true} showClose={false}>
      <div className="createNewAccount">
        <TitleText>初めてログイン</TitleText>
        <div className="creatNewAccountInputBox">
          <div className="mt-1"></div>
          <TextField
            className="createNewAccountTextField"
            label="学籍番号"
            inputProps={{ maxLength: 25 }}
            name="name"
            fullWidth
            value={userCode}
            onChange={(e) => {
              setUserCode(e.target.value);
            }}
          ></TextField>
          <div className="mt-1"></div>

          <TextField
            className="createNewAccountTextField"
            label="名前"
            inputProps={{ maxLength: 25 }}
            name="time"
            fullWidth
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></TextField>
          <div className="mt-1"></div>

          <TextField
            className="createNewAccountTextField"
            label="学部・学科"
            inputProps={{ maxLength: 25 }}
            name="place"
            fullWidth
            value={userFaculty}
            onChange={(e) => {
              setUserFaculty(e.target.value);
            }}
          ></TextField>
          <div className="mt-1"></div>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">性別</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sex}
              label="性別"
              onChange={(event) => {
                setSex(event.target.value);
              }}
            >
              <MenuItem value={1}>男</MenuItem>
              <MenuItem value={2}>女</MenuItem>
            </Select>
          </FormControl>
          <div className="mt-1"></div>

          <TextField
            className="createNewAccountTextField"
            label="電話番号"
            inputProps={{ maxLength: 25 }}
            fullWidth
            value={userPhone}
            onChange={(e) => {
              setUserPhone(e.target.value);
            }}
          ></TextField>
          <div className="mt-1">
            <Button
              fullWidth
              variant="contained"
              onClick={async () => {
                await userInfoConfirm();
              }}
            >
              登録
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
