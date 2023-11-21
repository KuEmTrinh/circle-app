import React, { useEffect, useState } from "react";
import "./User.css";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// Firebase
import { db, firebase } from "../../../../app/firebase";
import Modal from "../../../ui/Modal";

export default function User() {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState(""); // State for holding the search input value
  const [show, setShow] = useState(false);
  const [editUser, setEditUser] = useState(null); // Changed to null as we don't need an initial value
  const [role, setRole] = useState(""); // State for holding the selected role

  const fetchUserData = async () => {
    try {
      const query = db.collection("user").onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.docs.map((doc) => {
          let item = doc.data();
          item.id = doc.id;
          data.push(item);
        });
        setUsers(data);
      });
      return query;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Function to update the search input value
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Function to handle checkbox changes
  const handleCheckboxChange = (event) => {
    const roleName = event.target.name;
    const checked = event.target.checked;

    // Set the role state to the selected role or an empty string if unchecked
    setRole(checked ? roleName : "");
  };

  // Function to filter users based on the search input value
  const filteredUsers = users.filter((user) => {
    const lowerCaseSearchValue = searchValue.toLowerCase();
    return (
      user.name.toLowerCase().includes(lowerCaseSearchValue) ||
      user.email.toLowerCase().includes(lowerCaseSearchValue)
    );
  });

  // 追加: ユーザ削除機能の関数
const handleDeleteUser = async (userId) => {
  try {
    // Firebaseでユーザを削除
    await db.collection("user").doc(userId).delete();
  } catch (error) {
    console.error("Error deleting user:", error);
    // エラー処理を追加: ユーザを削除できなかった場合にエラーメッセージを表示するなど
  }
};

// ユーザ一覧内の削除ボタンのクリック時の処理
const handleUserDeleteClick = (userId) => {
  // 確認メッセージなどを表示して、ユーザの削除を確認するダイアログを表示するなど
  if (window.confirm("本当にこのユーザを削除しますか？")) {
    handleDeleteUser(userId);
  }
};


  const confirmAddRole = async () => {
    try {
      if (role.length > 0 && editUser) {
        // Perform the update operation using arrayUnion with the entire role state array
        await db
          .collection("user")
          .doc(editUser.id)
          .update({
            role: firebase.firestore.FieldValue.arrayUnion(role),
          });
      }

      // Reset the role state after successful update
      setRole([]);
      setEditUser(null);
      setShow(false); // Close the modal after successful update
    } catch (error) {
      console.log("Error adding roles:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <>
      <Modal
        show={show}
        onClose={() => {
          setShow(false);
        }}
      >
        {editUser && (
          <>
            <p>Create Role for {editUser.name}</p>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox onChange={handleCheckboxChange} name="五者執行部" />
                }
                label="五者執行部"
              />
              <FormControlLabel
                control={
                  <Checkbox onChange={handleCheckboxChange} name="体育会系" />
                }
                label="体育会系"
              />
              <FormControlLabel
                control={
                  <Checkbox onChange={handleCheckboxChange} name="学術文化系" />
                }
                label="学術文化系"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleCheckboxChange}
                    name="任意団体愛好会"
                  />
                }
                label="任意団体愛好会"
              />
            </FormGroup>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                confirmAddRole();
              }}
            >
              Confirm
            </Button>
          </>
        )}
      </Modal>
      <div className="dUser">
        <div style={{ overflow: "auto", maxHeight: "500px" }}>
          {/* Search input field with search icon */}
          <TextField
            id="search"
            label="Search by name or email..."
            value={searchValue}
            onChange={handleSearchChange}
            variant="outlined"
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
            sx={{ m: 2 }}
          />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Role</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
  {filteredUsers.map((user) => (
    <TableRow
      key={user.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {user.name}
      </TableCell>
      <TableCell align="right">{user.email}</TableCell>
      <TableCell align="right">
        <Stack direction="row" spacing={1} alignItems="flex-end">
          {user.role?.map((role) => {
            return <Chip label={role} key={role} />;
          })}
        </Stack>
      </TableCell>
      <TableCell align="right">
        <Button
          variant="contained"
          onClick={() => {
            setShow(true);
            setEditUser(user);
          }}
        >
          + Role
        </Button>
        {/* ユーザ削除ボタンの追加 */}
        <Button
          variant="contained"
          color="error"
          onClick={() => handleUserDeleteClick(user.id)}
        >
          削除
        </Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}
