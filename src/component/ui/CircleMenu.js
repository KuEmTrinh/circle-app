import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupIcon from "@mui/icons-material/Group";
import "./CircleMenu.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircleInfo from "../features/app/list/circle/CircleInfo";
import Chat from "../features/app/home/chat/Chat";
import Members from "../features/app/home/members/Member";
import Event from "../features/app/home/event/Event";
import { db } from "../../app/firebase";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
export default function CircleMenu({ circleId }) {
  const [value, setValue] = React.useState(0);
  const [dataCircleInfor, setDataCircleInfor] = useState();
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
          imgUrl: doc.data().imgUrl,
        };
        setDataCircleInfor(dataInfor);
      });
  const memberListOfCircleFromFirebase = async () => {
    const memberData = [];
    db.collection("circle")
      .doc(circleId)
      .collection("member")
      .where("status", "==", true)
      .onSnapshot((querySnapshot) => {
        querySnapshot.docs.map((doc) => {
          memberData.push(doc.data());
        });
      });
    setMemberOfCircle(memberData);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="circelMenu">
        <Tabs
          className="circleMenuList"
          value={value}
          onChange={handleChange}
          aria-label="icon position tabs example"
        >
          <Tab
            className="circleMenuItem"
            icon={<HomeIcon />}
            iconPosition="start"
            label="ホーム"
          />
          <Tab
            className="circleMenuItem"
            icon={<CalendarMonthIcon />}
            iconPosition="start"
            label="イベント"
          />
          <Tab
            className="circleMenuItem"
            icon={<ChatIcon />}
            iconPosition="start"
            label="会話"
          />
          <Tab
            className="circleMenuItem"
            icon={<GroupIcon />}
            iconPosition="start"
            label="メンバー"
          />
        </Tabs>
        <TabPanel className="tabPanel" value={value} index={0}>
          {dataCircleInfor ? (
            <>
              <CircleInfo
                circleData={dataCircleInfor}
                memberData={memberOfCircle}
              ></CircleInfo>
            </>
          ) : (
            "Loading"
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Event></Event>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Chat></Chat>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Members circleId={circleId}></Members>
        </TabPanel>
      </div>
    </>
  );
}
