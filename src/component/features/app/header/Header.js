import React, { useEffect, useState } from "react";
import "./Header.css";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { authentication, db } from "../../../../app/firebase";
import { signOut } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebase } from "../../../../app/firebase";
import { useDispatch } from "react-redux";
import { saveLoginInfo, deleteUserInfo } from "../../../slice/loginSlice";

function ContentComponent({ user,dispatch }) {

  // function

  const removeUserInfomation = async () =>{
    dispatch(deleteUserInfo());
  }
  const logout = () => {
    signOut(authentication)
      .then((res) => {
        removeUserInfomation();
        // console.log("da dang xuat");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="headerUserInformation">
        <img className="headerUserImage" alt="" src={user.photoURL} />
        <div className="headerUserName">
          <p>{user.displayName}</p>
        </div>
      </div>
      <div
        className="loginContent"
        onClick={() => {
          logout();
        }}
      >
        <p>Logout</p>
        <LogoutIcon color="whiteColor" />
      </div>
    </>
  );
}

function LoginComponent({ setUser }) {
  //function

  const setUserInfomationOnDatabase = async (user) => {
    db.collection("user").doc(user.uid).set({
      name: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      uid: user.uid,
      photoURL: user.photoURL,
    });
  };

  const checkUserExists = async (user) => {
    db.collection("user")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("User da ton tai");
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
        await setUser(res.user);
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
    <div className="login">
      {isLoading ? (
        <>
          {isLogin ? (
            <div className="headerContent sbHeaderContent">
              <ContentComponent user={user} dispatch={dispatch}/>
            </div>
          ) : (
            <div className="headerContent rightHeaderContent">
              <LoginComponent setUser={setUser} />
            </div>
          )}
        </>
      ) : (
        <>
          <p>Loading</p>
        </>
      )}
    </div>
  );
}
