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
import ButtonComponent from "../../../ui/ButtonComponent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import User from "../User/User";

// 新しいtoDateTime関数を定義
function toDateTime(secs) {
  var time = new Date(1970, 1, 0, 9);
  time.setSeconds(secs);
  let month = time.getMonth();
  let day = time.getDate();
  let hours = time.getHours();
  let min = time.getMinutes();
  return month + "月" + day + "日 " + hours + min + "分";
}

function CircleItemComponent({ circle, onApprove, onReject, showOperationCell }) {
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
        {showOperationCell && (
          <TableCell align="right">
            {circle.inActive ? (
              <ButtonComponent
                mode="danger"
                onClick={() => onReject(circle)}
              >
                削除
              </ButtonComponent>
            ) : (
              <>
                <ButtonComponent
                  mode="approve"
                  onClick={() => onApprove(circle)}
                >
                  承認
                </ButtonComponent>
                <ButtonComponent
                  mode="reject"
                  onClick={() => onReject(circle)}
                >
                  拒否
                </ButtonComponent>
              </>
            )}
          </TableCell>
        )}
      </TableRow>
    </>
  );
}

function CircleListComponent({ circleList, onApprove, onReject, showOperationCell }) {
  return (
    <div className="circleRegisterList">
      {circleList ? (
        <TableContainer component={Paper} style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <Table sx={{ minWidth: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">サークル名</TableCell>
                <TableCell align="right">申請者</TableCell>
                <TableCell align="right">タイプ</TableCell>
                <TableCell align="right">日時</TableCell>
                {showOperationCell && (
                  <TableCell align="right">操作</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {circleList.map((circle) => (
                <CircleItemComponent
                  key={circle.id}
                  circle={circle}
                  onApprove={onApprove}
                  onReject={onReject}
                  showOperationCell={showOperationCell}
                ></CircleItemComponent>
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
  const [registeringList, setRegisteringList] = useState([]);
  const [registedcircleList, setRegistedcircleList] = useState([]);
  const [inActiveCircleList, setinActiveCircleList] = useState([]); // 新しいステート

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
      let registeringListData = data.filter((el) => !el.status && !inActive);
      let registedcircleListData = data.filter((el) => el.status && !el.inActive);
      let inActiveCirclesData = data.filter((el) => el.ststus && el.inActive);
      setRegisteringList(registeringListData);
      setRegistedcircleList(registedcircleListData);
      setinActiveCircleList(inActiveCirclesData);
    });
  }

  const handleinActiveCircle = async (circle) => {
    if (window.confirm("このサークルを非表示にしますか？")) {
      try {
        // サークルの表示を非表示に変更
        const updatedCircle = { ...circle, inActive: true, status: false};
        await db.collection("circle").doc(circle.id).set(updatedCircle);

      } catch (error) {
        console.error("サークルの非表示化中にエラーが発生しました: ", error);
      }
    }
  };

  const handleApproveCircle = async (circle) => {
    if (window.confirm("このサークルを承認しますか？")) {
      try {
        await db.collection("circle").doc(circle.id).update({ status: true });
      } catch (error) {
        console.error("サークルの承認中にエラーが発生しました: ", error);
      }
    }
  };

  const handleRejectCircle = async (circle) => {
    if (window.confirm("このサークルを拒否しますか？")) {
      try {
        // サークルの表示を非表示に変更
        const updatedCircle = { ...circle, inActive: true };
        await db.collection("circle").doc(circle.id).set(updatedCircle);

        // 削除したサークルを休止中サークルリストに追加
        setinActiveCircleList([...inActiveCircleList, updatedCircle]);
      } catch (error) {
        console.error("サークルの非表示化中にエラーが発生しました: ", error);
      }
    }
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="center mt-1 mbt-1">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="circle list tabs"
        >
          <Tab label="申請中サークル" />
          <Tab label="サークル一覧" />
          <Tab label="休止中サークル" />
          <Tab label="ユーザ一覧" />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <CircleListComponent
          circleList={registeringList}
          showOperationCell={true}
          onApprove={handleApproveCircle}
          onReject={handleRejectCircle}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CircleListComponent
          circleList={registedcircleList}
          showOperationCell={true}
          onApprove={handleApproveCircle}
          onReject={handleRejectCircle}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CircleListComponent
          circleList={inActiveCircleList}
          showOperationCell={true}
          onApprove={handleApproveCircle}
          onReject={handleRejectCircle}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <User />
      </TabPanel>
      
    </div>
  );
}
