import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import "./Circle.css";
import ButtonComponent from "../../../../ui/ButtonComponent";
import { db } from "./../../../../../app/firebase";
import Modal from "../../../../ui/Modal";
import TitleText from "../../../../ui/TitleText";
import TextField from "@mui/material/TextField";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
function CircleTimeLine() {
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          09:30 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Eat</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          10:00 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Code</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          12:00 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Sleep</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          9:00 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Repeat</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

function CircleJoinComponent({ circleId }) {
  const [circleJoinToggle, setCircleJoinToggle] = useState(false);
  const [circleJoinUsername, setCircleJoinUsername] = useState("");
  const [circleJoinUsernumber, setCircleJoinUsernumber] = useState("");
  const [circleJoinMotivation, setCircleJoinMotivation] = useState("");
  let userInfo = useSelector((state) => state.login.data);

  //function
  const circleJoinConfirm = async () => {
    const query = db
      .collection("circle")
      .doc(circleId)
      .collection("member")
      .add({
        role: "user",
        userId: userInfo.uid,
        userName: circleJoinUsername,
        userNumber: circleJoinUsernumber,
        userMotivation: circleJoinMotivation,
        status: false,
      });
    setCircleJoinUsername("");
    setCircleJoinUsernumber("");
    setCircleJoinMotivation("");
    setCircleJoinToggle(false);
    return query;
  };

  return (
    <>
      <Modal
        show={circleJoinToggle}
        onClose={() => {
          setCircleJoinToggle(false);
        }}
      >
        <TitleText>サークル参加申請</TitleText>
        <TextField
          className="createNewCircleTextField"
          label="名前"
          inputProps={{ maxLength: 25 }}
          value={circleJoinUsername}
          onChange={(e) => {
            setCircleJoinUsername(e.target.value);
          }}
        ></TextField>
        <TextField
          className="createNewCircleTextField"
          label="学籍番号"
          inputProps={{ maxLength: 25 }}
          value={circleJoinUsernumber}
          onChange={(e) => {
            setCircleJoinUsernumber(e.target.value);
          }}
        ></TextField>
        <TextField
          className="createNewCircleTextField"
          label="志望動機"
          multiline
          rows={4}
          name="motivation"
          value={circleJoinMotivation}
          onChange={(e) => {
            setCircleJoinMotivation(e.target.value);
          }}
        ></TextField>
        <div className="circleJoinCircleConfirm center">
          <ButtonComponent
            onClick={() => {
              circleJoinConfirm();
            }}
          >
            参加申請
          </ButtonComponent>
        </div>
      </Modal>
      <div className="circleJoinButton center">
        <ButtonComponent
          size="large"
          onClick={() => {
            setCircleJoinToggle(true);
          }}
        >
          参加
        </ButtonComponent>
      </div>
    </>
  );
}

function CircleHomePage({ circleId }) {
  const [dataCircleInfor, setDataCircleInfor] = useState({});
  const [memberOfCircle, setMemberOfCircle] = useState([]);
  useEffect(() => {
    circleInforFromFirebase();
    memberListOfCircleFromFirebase();
  }, []);
  const circleInforFromFirebase = async () =>
    db
      .collection("circle")
      .doc(circleId)
      .get()
      .then((doc) => {
        const dataInfor = {
          name: doc.data().name,
          type: doc.data().type,
        };
        setDataCircleInfor(dataInfor);
      });
  const memberListOfCircleFromFirebase = async () => {
    const memberData = [];
    db.collection("circle")
      .doc(circleId)
      .collection("member")
      .onSnapshot((querySnapshot) => {
        querySnapshot.docs.map((doc) => {
          memberData.push(doc.data());
        });
      });
    setMemberOfCircle(memberData);
  };

  return (
    <>
      <div className="circleDeatailsBox">
        <h1 className="circleName">{dataCircleInfor.name}</h1>
        <div className="circleImageBox">
          <ul>
            {/* <li>
              <img
                className="circleImage"
                src="https://images.unsplash.com/photo-1511268594014-0e9d3ea5c33e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              ></img>
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1511268594014-0e9d3ea5c33e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"></img>
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1511268594014-0e9d3ea5c33e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"></img>
            </li> */}
          </ul>
        </div>
        <div className="circleMemberBox">
          <div className="circleTitleBox">
            {<FiberManualRecordIcon fontSize="small" />}
            <p>サークル会員</p>
          </div>
          <div className="circleMemberList">
            <div className="circleMemberItem">
              {memberOfCircle ? (
                <>
                  {memberOfCircle.map((member) => {
                    return (
                      <>
                        {" "}
                        <Avatar src={member.userPhotoURL} />
                        <p>{member.userName}</p>
                      </>
                    );
                  })}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="circlePlaceBox">
          <div className="circleTitleBox">
            {<FiberManualRecordIcon fontSize="small" />}
            <p>サークル場所</p>
          </div>
          <div className="circlePlace">
            <p>中央会館８階部室</p>
          </div>
        </div>
        <div className="circleIntroBox">
          <div className="circleTitleBox">
            {<FiberManualRecordIcon fontSize="small" />}
            <p>サークル紹介</p>
          </div>
          <div className="circleIntro">
            <p>
              新入生の皆さんご入学おめでとうございます！
              私たち代議員会事務局は各学年各学科1名、各サークルに1名いる代議員をまとめています。簡単に言えば生徒会のようなものです。もちろん学生たちの間で行うので気楽です!
              名前からして堅苦しいイメージがあると思いますが、実際はそんなことはなく、1人が困った時はみんなで解決策を考えます。One
              for all All for oneです。ぜひ、部室に遊びに来てみてください。
            </p>
          </div>
        </div>
        <div className="circleScheduleBox">
          <div className="circleTitleBox">
            {<FiberManualRecordIcon fontSize="small" />}
            <p>サークルスケジュール</p>
          </div>
          <div className="circleSchedule">
            <CircleTimeLine></CircleTimeLine>
          </div>
        </div>
        <CircleJoinComponent circleId={circleId}></CircleJoinComponent>
      </div>
    </>
  );
}

export default function Circle() {
  let { circleId } = useParams();
  return (
    <div className="circleHomePage">
      <CircleHomePage circleId={circleId}></CircleHomePage>
    </div>
  );
}
