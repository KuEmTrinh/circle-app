import React from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import DangerousIcon from "@mui/icons-material/Dangerous";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { red, green } from "@mui/material/colors";
import "./Members.css";
export default function Members() {
  return (
    <div className="memberPage">
      <div className="wantToJoinUserBox">
        <div className="circleTitleBox">
          {<FiberManualRecordIcon fontSize="small" />}
          <p>参加したいメンバーリスト</p>
        </div>
        <div className="wantToJoinUser">
          <div className="wantToJoinUserAvatar">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
          </div>
          <div className="wantToJoinUserMessageBox">
            <div className="wantToJoinUserMessage">
              <p className="wantToJoinUserName">さくら</p>
              <p className="wantToJoinUserMessageTextBox">
                Helloooooooooooooooooooooooooooooooooooooooooooooooooooo
              </p>
            </div>

            <div className="wantToJoinUserRep">
              <div className="wantToJoinUserRepButton">
                <DangerousIcon sx={{ color: red[800] }} />
                <p>中止</p>
              </div>
              <div className="wantToJoinUserRepButton">
                <CheckCircleIcon sx={{ color: green[800] }} />
                <p>同意</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="memberListBox">
        <div className="circleTitleBox">
          {<FiberManualRecordIcon fontSize="small" />}
          <p>メンバーリスト</p>
        </div>
        <div className="memberList">
          <div className="memberInfor">
            <div className="memberAvatar">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
            </div>
          </div>
          <div className="findMember"></div>
        </div>
      </div>
    </div>
  );
}
