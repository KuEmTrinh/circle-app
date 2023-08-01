import React from 'react'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import LoginIcon from "@mui/icons-material/Login";
import {
  saveLoginInfo,
} from "../../../slice/loginSlice";
import { authentication, db } from "../../../../app/firebase";
import { useDispatch } from "react-redux";

export default function Login() {

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
    <div className="loginBox">
      <div
        className="loginContent"
        onClick={() => {
          loginWithGmail();
        }}
      >
        <p>Login</p>
        <LoginIcon color="whiteColor" />
      </div>
    </div>
  );
}
