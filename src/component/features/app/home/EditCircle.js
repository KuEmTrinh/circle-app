import React, { useState, useEffect, useRef } from "react";
import "./EditCircle.css";
import TextField from "@mui/material/TextField";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { pink } from "@mui/material/colors";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
// import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import ButtonComponent from "../../../ui/ButtonComponent";
// import { FormControl, MenuItem, Select } from "@mui/material";
// import { InputLabel } from "@mui/material";

function TimelineInput({ idx, timeLineRef }) {
  const [time, setTime] = useState();
  const [content, setContent] = useState();
  const timeValueChange = (e) => {
    setTime(e.target.value);
    timeLineRef.current[idx].time = e.target.value;
  };
  const contentValueChange = (e) => {
    setContent(e.target.value);
    timeLineRef.current[idx].content = e.target.value;
  };
  return (
    <>
      <div className="editTimeline">
        <TextField
          className="editCircleItemInput editTimeInTimeline"
          id="outlined-name"
          label="日時"
          // name="place"
          // defaultValue={editCircleInfo.place ? editCircleInfo.place : " "}
          onChange={(e) => {
            timeValueChange(e);
          }}
          value={time}
        />
        <TextField
          className="editCircleItemInput editEventInTimeline"
          id="outlined-name"
          label="内容"
          // name="place"
          // defaultValue={editCircleInfo.place ? editCircleInfo.place : " "}
          onChange={(e) => {
            contentValueChange(e);
          }}
          value={content}
        />
      </div>
    </>
  );
}

function TimeLineComponent({ timeLineRef }) {
  const [timeLines, setTimeLines] = useState([]);

  const pushNewElementFortimeLineRef = () => {
    timeLineRef.current.push({
      time: "",
      content: "",
    });
  };
  return (
    <>
      {timeLines ? (
        <>
          {timeLines.map((el) => {
            return el;
          })}
        </>
      ) : (
        ""
      )}
      <div
        className="addTimelineIconBox"
        onClick={async () => {
          await pushNewElementFortimeLineRef();
          await setTimeLines([
            ...timeLines,
            <TimelineInput
              timeLineRef={timeLineRef}
              idx={timeLines.length}
            ></TimelineInput>,
          ]);
        }}
      >
        <LibraryAddIcon
          fontSize="large"
          className="addTimelineIcon"
        ></LibraryAddIcon>
      </div>
    </>
  );
}

//  DEFAULT FUNCTION
export default function EditCircle(props) {
  const timeLineRef = useRef([]);
  // console.log(circle);
  const [percent, setPercent] = useState(0);
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState();
  const [, setCircleType] = useState("");
  const [editCircleInfo, setEditCircleInfo] = useState({
    name: props.circle.name,
    male: props.circle.male || 0,
    female: props.circle.female || 0,
    money: props.circle.money,
    motivation: props.circle.motivation,
    greetingText: props.circle.greetingText || ".",
    place: props.circle.place || ".",
    introductionText: props.circle.introductionText || ".",
  });
  const handleChange = (e) => {
    setEditCircleInfo({
      ...editCircleInfo,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    sendEditCircleInfor(editCircleInfo);
  }, [editCircleInfo]);
  const sendEditCircleInfor = (editCircleInfo) => {
    props.getDataFromChild(editCircleInfo);
  };

  // return
  return (
    <div className="editCircelPage">
      <div className="circleTitle">サークル編集</div>
      <div className="editCircleBox">
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
            name="male"
            defaultValue={editCircleInfo.male}
            label="男の人"
            onChange={handleChange}
            type="number"
          />
        </div>
        <div className="editCircleItem">
          <TextField
            className="editCircleItemInput"
            id="outlined-name"
            name="female"
            defaultValue={editCircleInfo.female}
            label="女の人"
            onChange={handleChange}
            type="number"
          />
        </div>
        <div className="totalMemberText">
          現在の人数　:{" "}
          {parseInt(editCircleInfo.female) + parseInt(editCircleInfo.male)}
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
            label="メッセージ"
            name="greetingText"
            defaultValue={
              editCircleInfo.greetingText ? editCircleInfo.greetingText : " "
            }
            onChange={handleChange}
          />
        </div>
        <div className="editCircleItem">
          <TextField
            className="editCircleItemInput"
            id="outlined-name"
            label="場所"
            name="place"
            defaultValue={editCircleInfo.place ? editCircleInfo.place : " "}
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
            defaultValue={
              editCircleInfo.introductionText
                ? editCircleInfo.introductionText
                : " "
            }
            onChange={handleChange}
          />
        </div>
        <TimeLineComponent timeLineRef={props.timeLineRef}></TimeLineComponent>
      </div>
    </div>
  );
}
