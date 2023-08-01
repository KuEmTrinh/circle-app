import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import LoginIcon from "@mui/icons-material/Login";
import { saveLoginInfo } from "../../../slice/loginSlice";
import { authentication, db } from "../../../../app/firebase";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "../../../ui/Modal";
import { Button } from "@mui/material";

export default function Login() {
  const [show, setShow] = useState(false);

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
        console.log("Da dang nhap");
      })
      .catch((error) => {
        console.log("Login Failed");
      });
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
          <TextField id="outlined-basic" label="Email" variant="outlined" />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
          />
          <Button variant="contained" fullWidth>
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
