import React, { useState, useEffect } from "react";
import "./EditCircle.css";
import TextField from "@mui/material/TextField";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import ButtonComponent from "../../../ui/ButtonComponent";


export default function EditCircle({ circle }) {
  // console.log(circle);
  const [percent, setPercent] = useState(0);
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState();
  const [editCircleInfo, setEditCircleInfo] = useState({
    type: circle.type,
    name: circle.name,
    members: circle.members,
    money: circle.money,
    motivation: circle.motivation,
    greetingText:circle.greetingText,
    place:circle.place,
    introductionText:circle.introductionText,
    
  });
  const handleChange = (e) => {
    setEditCircleInfo({
      ...editCircleInfo,
      [e.target.name]: e.target.value,
    });
  };
  console.log(editCircleInfo)
  // image upload code
 
  // return
  return (
    <div className="editCircelPage">
      <div className="circleTitle">サークル編集</div>
      <div className="editCircleBox">
        <div className="editCircleItem">
          <TextField
            className="editCircleItemInput"
            id="outlined-name"
            name="type"
            defaultValue={editCircleInfo.type}
            label="種類"
            onChange={handleChange}
          />
        </div>
        <div className="editCircleItem">
          <TextField
            className="editCircleItemInput"
            id="outlined-name"
            name="name"
            defaultValue={editCircleInfo.name}
            label="名前"
            onChange={handleChange}
          />
        </div>
        <div className="editCircleItem">
          <TextField
            className="editCircleItemInput"
            id="outlined-name"
            name="members"
            defaultValue={editCircleInfo.members}
            label="最大人数"
            onChange={handleChange}
          />
        </div>
        <div className="editCircleItem">
          <TextField
            className="editCircleItemInput"
            id="outlined-name"
            label="会費"
            name="money"
            defaultValue={editCircleInfo.money}
            onChange={handleChange}
          />
        </div>
        <div className="editCircleItem">
          <TextField
            className="editCircleItemInput"
            id="outlined-name"
            label="挨拶"
            name="greetingText"
            defaultValue={editCircleInfo.greetingText}
            onChange={handleChange}
          />
        </div>
        <div className="editCircleItem">
          <TextField
            className="editCircleItemInput"
            id="outlined-name"
            label="場所"
            name="place"
            defaultValue={editCircleInfo.place}
            onChange={handleChange}
          />
        </div>
        <div className="editCircleItem">
          <TextField
            className="editCircleItemInput"
            id="outlined-name"
            label="紹介"
            name="introductionText"
            rows={4}
            multiline
            defaultValue={editCircleInfo.introductionText}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
