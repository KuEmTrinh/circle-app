import React, { useEffect, useState, useRef } from "react";
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
  const [editUser, setEditUser] = useState(null);
  const userRoles = useRef();

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

  // Function to filter users based on the search input value
  const filteredUsers = users.filter((user) => {
    const lowerCaseSearchValue = searchValue.toLowerCase();
    return (
      user.name.toLowerCase().includes(lowerCaseSearchValue) ||
      user.email.toLowerCase().includes(lowerCaseSearchValue)
    );
  });

  const confirmAddRole = async () => {
    try {
      await db.collection("user").doc(editUser.id).update({
        role: userRoles.current,
      });

      // Reset the role state after successful update
      setEditUser(null);
      setShow(false); // Close the modal after successful update
    } catch (error) {
      console.log("Error adding roles:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };
  const getIsCheckValue = (role) => {
    let isChecked = false;
    isChecked = editUser.role.find((element) => element == role);
    return isChecked;
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
              <UserRoleCheckboxComponent
                label="五者執行部"
                isCheck={getIsCheckValue("五者執行部")}
                userRoles={userRoles}
                editUser={editUser}
              />
              <UserRoleCheckboxComponent
                label="体育会系"
                isCheck={getIsCheckValue("体育会系")}
                userRoles={userRoles}
                editUser={editUser}
              />
              <UserRoleCheckboxComponent
                label="学術文化系"
                isCheck={getIsCheckValue("学術文化系")}
                userRoles={userRoles}
                editUser={editUser}
              />
              <UserRoleCheckboxComponent
                label="任意団体愛好会"
                isCheck={getIsCheckValue("任意団体愛好会")}
                userRoles={userRoles}
                editUser={editUser}
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
                {filteredUsers?.map((user) => (
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
                        onClick={async () => {
                          setShow(true);
                          userRoles.current = await user.role;
                          setEditUser(user);
                        }}
                      >
                        + Role
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

function UserRoleCheckboxComponent(props) {
  const [isChecked, setIsChecked] = useState(props.isCheck);
  let userRoles = props.userRoles.current;
  const handleChangeCheckedValue = async () => {
    if (isChecked) {
      let updateUserRoles = await userRoles.filter(
        (element) => element != props.label
      );
      props.userRoles.current = await updateUserRoles;
    } else {
      props.userRoles.current.push(props.label);
    }
    setIsChecked(!isChecked);
    return;
  };
  return (
    <FormControlLabel
      control={
        <Checkbox
          onChange={handleChangeCheckedValue}
          name={props.label}
          checked={isChecked}
        />
      }
      label={props.label}
    />
  );
}
