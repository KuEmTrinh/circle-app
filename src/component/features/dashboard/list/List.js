import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./List.css";
import { db } from "../../../../app/firebase";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function List() {
  const [circleList, setCircleList] = useState();
  useEffect(() => {
    fetchCircleData();
  }, []);
  //function
  const fetchCircleData = () => {
    db.collection("circle").onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.docs.map((doc) => {
        let item = doc.data();
        item.id = doc.id;
        data.push(item);
      });
      setCircleList(data);
      console.log(data);
    });
  };
  return (
    <div className="circleRegisterList">
      {circleList ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">サークル名</TableCell>
                <TableCell align="right">会長</TableCell>
                <TableCell align="right">タイプ</TableCell>
                <TableCell align="right">日時</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {circleList.map((circle) => (
                <TableRow
                  key={circle.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <TableCell align="left">{circle.name}</TableCell>
                  <TableCell align="right">{circle.registerUsername}</TableCell>
                  <TableCell align="right">{circle.carbs}</TableCell>
                  <TableCell align="right">{circle.carbs}</TableCell> */}
                  <TableCell align="left">{circle.name}</TableCell>
                  <TableCell align="right">125125</TableCell>
                  <TableCell align="right">125125</TableCell>
                  <TableCell align="right">125125</TableCell>
                </TableRow>
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
