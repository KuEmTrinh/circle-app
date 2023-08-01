import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import LoginIcon from "@mui/icons-material/Login";
import { saveLoginInfo, saveLDAPToken } from "../../../slice/loginSlice";
import { authentication, db } from "../../../../app/firebase";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "../../../ui/Modal";
import { Button } from "@mui/material";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function Login() {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setUserInfomationOnDatabase = async (user) => {
    db.collection("user")
      .doc(user.uid)
      .set({
        name: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        uid: user.uid,
        photoURL: user.photoURL,
        registed: false,
        role: ["user"],
      });
  };

  const checkUserExists = async (user) => {
    db.collection("user")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          dispatch(saveLoginInfo(doc.data()));
        } else {
          setUserInfomationOnDatabase(user);
        }
      });
  };

  const dispatch = useDispatch();
  const loginWithGmail = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then(async (res) => {
        await dispatch(saveLoginInfo(res.user));
        await checkUserExists(res.user);
        console.log(res.user);
      })
      .catch((error) => {
        console.log("Login Failed");
      });
  };

  const checkIsExistsUser = async (mail) => {
    let flag = false;
    const snapshot = await db
      .collection("user")
      .where("email", "==", mail)
      .get();
    let thisUser = [];
    let snapshotLength = snapshot.docs.length;
    if (snapshotLength > 0) {
      snapshot.docs.map((doc) => {
        let item = doc.data();
        thisUser.push(item);
      });
      dispatch(saveLDAPToken(thisUser[0].uid));
      saveUserInfoInLocalStorage(thisUser[0].uid);
      flag = true;
    } else {
      flag = false;
    }
    return flag;
  };

  const saveUserInfoInLocalStorage = (id) => {
    localStorage.setItem("userToken", id);
  };

  const saveLoginDataWithLDAP = async (user) => {
    const generatedId = await uuidv4();
    const userInfo = {
      email: user.mail,
      emailVerified: true,
      name: user.name,
      photoURL: "",
      registed: true,
      role: ["user"],
      sex: 1,
      uid: generatedId,
      userCode: user.uid,
      userFaculty: "",
      userPhone: "",
    };

    let checkValue = await checkIsExistsUser(user.mail);
    if (!checkValue) {
      try {
        const createUserQuery = await db
          .collection("user")
          .doc(generatedId)
          .set(userInfo);
        dispatch(saveLDAPToken(userInfo.uid));
        localStorage.setItem("userToken", userInfo.uid);
        return createUserQuery;
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(username, password);

    try {
      const response = await axios.post("http://localhost/api/login.php", {
        username: username,
        password: password,
      });
      // setLoginData(response.data.data[0]);
      const userInfo = {
        name: response.data.data[0].cn,
        description: response.data.data[0].description,
        mail: response.data.data[0].mail,
        id: response.data.data[0].gidnumber,
        studentId: response.data.data[0].sambasid,
        uid: response.data.data[0].uid,
      };
      if (response.data.success) {
        console.log(response.data.data[0]);
        saveLoginDataWithLDAP(userInfo);
      }
    } catch (error) {
      console.error(error);
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
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 1,
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Email"
            variant="outlined"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            Login
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              loginWithGmail();
            }}
          >
            GMAIL LOGIN
          </Button>
        </Box>
      </Modal>
      <div className="loginBox">
        <div
          className="loginContent"
          onClick={() => {
            setShow(true);
          }}
        >
          <p>Login</p>
          <LoginIcon color="whiteColor" />
        </div>
      </div>
    </>
  );
}
