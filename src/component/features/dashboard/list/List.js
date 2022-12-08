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
import { db } from "../../../../app/firebase";
import Modal from "../../../ui/Modal";
import ButtonComponent from "../../../ui/ButtonComponent";
import { arrayUnion } from "firebase/firestore";
import { el } from "date-fns/locale";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
function CircleItemComponent({ circle },props) {
  const [circleDetailsToggle, setCircleDetailsToggle] = useState(false);
  const [registeringListToggle, setRegisteringListToggle] = useState(false);
  const [registedcircleListToggle, setRegistedcircleListListToggle] = useState(false);
  const [registercircleDeleateListToggle, setRegistercircleDeleateListToggle] = useState(false);
  const toDateTime = (secs) => {
    var time = new Date(1970, 1, 0, 9);
    time.setSeconds(secs);
    let month = time.getMonth();
    let day = time.getDate();
    let hours = time.getHours();
    let min = time.getMinutes();
    return month + "月" + day + "日 " + hours + "時" + min + "分";
  };


  const confirmCircle = (circle) => {

    db.collection("circle").doc(circle.id).update({
      status: true,
    });
    db.collection("circle").doc(circle.id).collection("member").add({
      role: "circleAdmin",
      userName: circle.registerUsername,
      userId: circle.registerUid,
      userPhotoURL: circle.registerUserPhotoURL,

    });
    db.collection("user")
      .doc(circle.registerUid)
      .update({
        circleList: arrayUnion(circle.id),
      });
  };
  return (
    <>
      <Modal
        show={registeringListToggle}
        onClose={() => {
          setRegisteringListToggle(false);
        }}
      >
        <p className="subTitle">情報を確認</p>
        <p>サークル名：{circle.name}</p>
        <p>申請者：{circle.registerUsername}</p>
        <p>ID：{circle.registerUid}</p>
        <p>説明:{circle.motivation}</p>


        <div className="center sp-ar">
          <div className="register" >
            <ButtonComponent mode="cancel"
              onClick={() => {
                setRegisteringListToggle(false);
              }}
            >
              戻る
            </ButtonComponent>

            <ButtonComponent mode="ok"
              onClick={() => {
                confirmCircle(circle);
                setCircleDetailsToggle(false);
              }}
            >
              許可
            </ButtonComponent>

            <ButtonComponent mode="no"
              onClick={() => {
                setCircleDetailsToggle(false);
              }}
            >
              拒否
            </ButtonComponent>

            <ButtonComponent mode="DleateFlag"
              onClick={() => {
                confirmCircle(circle);
                setRegistercircleDeleateListToggle(false);
              }}
            >
              削除
            </ButtonComponent>
          </div>
        </div>
      </Modal>
      <Modal
        show={registedcircleListToggle}
        onClose={() => {
          setRegistedcircleListListToggle(false);
        }}
      >

        <div className="center sp-ar">
          <ButtonComponent mode="cancel"
            onClick={() => {
              setRegistedcircleListListToggle(false);
            }}
          >
            戻る
          </ButtonComponent>

          <ButtonComponent mode="DleateFlag"
            onClick={() => {
              confirmCircle(circle);
              setCircleDetailsToggle(false);
            }}
          >
            削除
          </ButtonComponent>
        </div>
      </Modal>
      <TableRow
        key={circle.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        onClick={() => {
          
          setRegisteringListToggle(true);
        }}
      >
        
        <TableCell align="center">{circle.name}</TableCell>
        <TableCell align="center">{circle.registerUsername}</TableCell>
        <TableCell align="center">{circle.type}</TableCell>
        <TableCell align="center">{toDateTime(circle.createdAt)}</TableCell>
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
                <TableCell align="center">サークル名</TableCell>
                <TableCell align="center">申請者</TableCell>
                <TableCell align="center">タイプ</TableCell>
                <TableCell align="center">日時</TableCell>
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
function TabPanel() {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
export default function List() {
  const [registeringList, setRegisteringList] = useState();
  const [registedcircleList, setRegistedcircleList] = useState();
  const [registercircleDeleateList, setRegistercircleDeleateList] = useState();
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
      let registercircleDeleateListData = data.filter((el) => el.status == false);
      setRegisteringList(registeringListData);
      setRegistedcircleList(registedcircleListData);
      setRegistercircleDeleateList(registercircleDeleateListData);
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
          <Tab label="削除フラグ付き" />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <CircleListComponent
          mode="registeringList"
          circleList={registeringList}
        > </CircleListComponent>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CircleListComponent
          mode="registedcircleList"
          circleList={registedcircleList}
        ></CircleListComponent>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CircleListComponent
          mode="registercircleDeleateList"
          circleList={registercircleDeleateList}
        ></CircleListComponent>
      </TabPanel>
      {/* <CircleListComponent
        circleList={value == 0 ? registeringList : registedcircleList}
      ></CircleListComponent> */}
    </>
  );
}
