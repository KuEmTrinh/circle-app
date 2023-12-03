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
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

import User from "../User/User";
import ListButton from "./ListButton";
function CircleItemComponent({ circle }) {
  const status = circle.status;
  const isDisable = circle?.isDisable;
  const toDateTime = (secs) => {
    var time = new Date(1970, 1, 0, 9);
    time.setSeconds(secs);
    let month = time.getMonth();
    let day = time.getDate();
    let hours = time.getHours();
    let min = time.getMinutes();
    return month + "月" + day + "日 " + hours + "時" + min + "分";
  };

  return (
    <>
      <TableRow
        key={circle.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell align="left">{circle.name}</TableCell>
        <TableCell align="right">{circle.registerUsername}</TableCell>
        <TableCell align="right">{circle.circleType}</TableCell>
        <TableCell align="right">{toDateTime(circle.createdAt)}</TableCell>
        <TableCell align="right">
          <ListButton status={status} isDisable={isDisable} circle={circle} />
        </TableCell>
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
                <TableCell align="right">操作</TableCell>
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
  const [disableList, setDisableList] = useState();
  const userRole = useSelector((state) => state.login.data.role);
  const isSystemAdmin = userRole?.includes("systemAdmin");
  useEffect(() => {
    fetchCircleData();
  }, []);

  const checkHaveRoleForThisCircle = (type) => {
    return userRole?.includes(type);
  };

  const fetchCircleData = () => {
    db.collection("circle").onSnapshot((querySnapshot) => {
      let registeringListData = [];
      let registedCircleListData = [];
      let disableCircleListData = [];
      querySnapshot.docs.map((doc) => {
        let item = doc.data();
        item.id = doc.id;
        if (item?.isDisable == true) {
          item.isDisable = true;
        } else {
          item.isDisable = false;
        }
        let shouldProcessItem =
          isSystemAdmin || checkHaveRoleForThisCircle(item.circleType);

        if (shouldProcessItem) {
          if (item.status === false) {
            registeringListData.push(item);
          } else if (item.isDisable) {
            disableCircleListData.push(item);
          } else {
            registedCircleListData.push(item);
          }
        }
      });
      setRegisteringList(registeringListData);
      setRegistedcircleList(registedCircleListData);
      setDisableList(disableCircleListData);
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
          <Tab label="休止中" />
          {isSystemAdmin ? <Tab label="ユーザ" /> : ""}
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <CircleListComponent circleList={registeringList} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CircleListComponent
          circleList={registedcircleList}
        ></CircleListComponent>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CircleListComponent circleList={disableList}></CircleListComponent>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <User />
      </TabPanel>
    </>
  );
}
