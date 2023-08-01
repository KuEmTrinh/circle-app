import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./List.css";
import { db, firebase } from "../../../../app/firebase";
import Modal from "../../../ui/Modal";
import ButtonComponent from "../../../ui/ButtonComponent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import User from "../User/User";
function CircleItemComponent({ circle }) {
  const [circleDetailsToggle, setCircleDetailsToggle] = useState(false);
  const toDateTime = (secs) => {
    var time = new Date(1970, 1, 0, 9);
    time.setSeconds(secs);
    let month = time.getMonth();
    let day = time.getDate();
    let hours = time.getHours();
    let min = time.getMinutes();
    return month + "月" + day + "日 " + hours + "時" + min + "分";
  };

  const getNameForRegister = async (uid) => {
    try {
      const query = await db.collection("user").doc(uid).get();
      let userName = query.data().name;
      console.log(userName);
      return userName;
    } catch (error) {}
  };

  const confirmCircle = async (circle) => {
    console.log(circle);
    try {
      let userName = await getNameForRegister(circle.registerUid);
      await db.collection("circle").doc(circle.id).update({
        status: true,
      });
      await db.collection("circle").doc(circle.id).collection("member").add({
        role: "circleAdmin",
        userName: userName, // Make sure this is a valid string value.
        userId: circle.registerUid,
        userPhotoURL: circle.registerUserPhotoURL,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        status: true,
      });
      await db
        .collection("user")
        .doc(circle.registerUid)
        .update({
          circleList: firebase.firestore.FieldValue.arrayUnion(circle.id),
        });
      // Create notigicaion
      await db
        .collection("user")
        .doc(circle.registerUid)
        .collection("notification")
        .add({
          circleId: circle.id,
          circleName: circle.name,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          message: circle.name + "のサークル申請できました。",
          read: false,
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        show={circleDetailsToggle}
        onClose={() => {
          setCircleDetailsToggle(false);
        }}
      >
        <p className="subTitle">情報を確認</p>
        <p>ここはサークル確認情報を追加</p>
        <div className="center sp-ar">
          <ButtonComponent mode="cancel">キャンセル</ButtonComponent>
          <ButtonComponent
            onClick={() => {
              confirmCircle(circle);
              setCircleDetailsToggle(false);
            }}
          >
            同意
          </ButtonComponent>
        </div>
      </Modal>
      <TableRow
        key={circle.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        onClick={() => {
          setCircleDetailsToggle(true);
        }}
      >
        <TableCell align="left">{circle.name}</TableCell>
        <TableCell align="right">{circle.registerUsername}</TableCell>
        <TableCell align="right">{circle.circleType}</TableCell>
        <TableCell align="right">{toDateTime(circle.createdAt)}</TableCell>
      </TableRow>
    </>
  );
}

function CircleListComponent({ circleList }) {
  //function
  return (
    <div className="circleRegisterList">
      {circleList ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">サークル名</TableCell>
                <TableCell align="right">申請者</TableCell>
                <TableCell align="right">タイプ</TableCell>
                <TableCell align="right">日時</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {circleList.map((circle) => (
                <CircleItemComponent circle={circle}></CircleItemComponent>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        "Loading"
      )}
    </div>
  );
}

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

export default function List() {
  const [registeringList, setRegisteringList] = useState();
  const [registedcircleList, setRegistedcircleList] = useState();
  useEffect(() => {
    fetchCircleData();
  }, []);
  const fetchCircleData = () => {
    db.collection("circle").onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.docs.map((doc) => {
        let item = doc.data();
        item.id = doc.id;
        data.push(item);
      });
      let registeringListData = data.filter((el) => el.status == false);
      let registedcircleListData = data.filter((el) => el.status == true);
      setRegisteringList(registeringListData);
      setRegistedcircleList(registedcircleListData);
    });
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="center mt-1 mbt-1">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="申請中" />
          <Tab label="申請済み" />
          <Tab label="削除" />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <CircleListComponent circleList={registeringList}></CircleListComponent>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CircleListComponent
          circleList={registedcircleList}
        ></CircleListComponent>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <User />
      </TabPanel>
    </>
  );
}
