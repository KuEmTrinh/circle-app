import React, { useEffect, useState } from "react";
import "./Header.css";
import Card from "../../../ui/card";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from '@mui/icons-material/Logout';
import { authentication } from "../../../../app/firebase";
import { signOut } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebase } from "../../../../app/firebase";
import { useDispatch } from "react-redux";
import { saveLoginInfo } from "../../../slice/loginSlice";
function ContentComponent() {
  const logout = () => {
    signOut(authentication)
      .then(() => {
        console.log("da dang xuat");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <img src="https://plus.unsplash.com/premium_photo-1661645343248-230a3669f161?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80" />
      <div
        className="loginContent"
        onClick={() => {
          logout();
        }}
      >
        <p>Logout</p>
        <LogoutIcon color="action" />
      </div>
    </>
  );
}

function LoginComponent({ setUser }) {
  const dispatch = useDispatch();
  const loginWithGmail = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((res) => {
        dispatch(saveLoginInfo(res.user));
        console.log("Da dang nhap");
      })
      .catch((error) => {
        console.log("Login Failed");
      });
  };
  return (
    <div className="login">
      <div
        className="loginContent"
        onClick={() => {
          loginWithGmail();
        }}
      >
        <p>Login</p>
        <LoginIcon color="action" />
      </div>
    </div>
  );
}

export default function Header() {
  const [user, setUser] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const checkLogin = async () => {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userInfomation = JSON.stringify(user);
        dispatch(saveLoginInfo(userInfomation));
        return setIsLogin(true);
      } else {
        return setIsLogin(false);
      }
    });
    await setIsLoading(true);
  };
  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <Card width="100%" height="52px">
      {isLoading ? (
        <>
          {isLogin ? (
            <div className="headerContent sbHeaderContent">
              <ContentComponent />
            </div>
          ) : (
            <div className="headerContent rightHeaderContent">
              <LoginComponent setUser={setUser} user={user} />
            </div>
          )}
        </>
      ) : (
        <>
          <p>Loading</p>
        </>
      )}
    </Card>
  );
}
