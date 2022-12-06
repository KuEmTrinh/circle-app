import React, { useEffect, useState } from "react";
import { db } from "./../../../../../app/firebase";
import Avatar from "@mui/material/Avatar";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
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
export default function CircleInfo({ circleData, memberData }) {
  return (
    <div className="circleDeatailsBox">
      <h1 className="circleName">{circleData.name}</h1>
      <div className="circleImageBox">
        <ul>
          <img className="circleImage" src={circleData.imgUrl}></img>
        </ul>
      </div>
      <div className="circleMemberBox">
        <div className="circleTitleBox">
          {<FiberManualRecordIcon fontSize="small" />}
          <p>サークル会員</p>
        </div>
        {memberData ? (
          <div className="circleMemberList">
            {memberData.map((member) => {
              return (
                <div className="circleMemberItem">
                  <Avatar src={member.userPhotoURL} />
                  <p className="circleMemberItemUsername">{member.userName}</p>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="circleMessBox">
        <div className="circleTitleBox">
          {<FiberManualRecordIcon fontSize="small" />}
          <p>サークルのメッセージ</p>
        </div>
        <div className="circleMess">
          <p>{circleData.greetingText}</p>
        </div>
      </div>
      <div className="circlePlaceBox">
        <div className="circleTitleBox">
          {<FiberManualRecordIcon fontSize="small" />}
          <p>サークル場所</p>
        </div>
        <div className="circlePlace">
          <p>{circleData.place}</p>
        </div>
      </div>
      <div className="circleIntroBox">
        <div className="circleTitleBox">
          {<FiberManualRecordIcon fontSize="small" />}
          <p>サークル紹介</p>
        </div>
        <div className="circleIntro">
          <p>
           {circleData.introductionText}
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
    </div>
  );
}
