import React, { useEffect, useState } from "react";
import "./Header.css";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { authentication, db } from "../../../../app/firebase";
import { signOut } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebase } from "../../../../app/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  saveLoginInfo,
  deleteUserInfo,
} from "../../../slice/loginSlice";

function ContentComponent({ dispatch }) {
  let userInfo = useSelector((state) => state.login.data);
  // function

  const removeUserInfomation = async () => {
    dispatch(deleteUserInfo());
  };
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
        <img className="headerUserImage" alt="" src={userInfo.photoURL} />
        <div className="headerUserName">
          <p>{userInfo.name ? userInfo.name : userInfo.displayName}</p>
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

function LoginComponent() {
  //function

  const setUserInfomationOnDatabase = async (user) => {
    db.collection("user")
      .doc(user.uid)
      .set({
        name: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        uid: user.uid,
        photoURL: user.photoURL,
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

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const getUserInfomation = async (user) => {
    db.collection("user")
      .doc(user.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          console.log(user);
          dispatch(saveLoginInfo(doc.data()));
        }
      });
  };

  const checkLogin = async () => {
    try {
      await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          getUserInfomation(user);
          return setIsLogin(true);
        } else {
          return setIsLogin(false);
        }
      });
      await setIsLoading(true);
    } catch (error) {
      console.log("error");
    }
  };

  // const getUserInfomationForReduxStore = async (uid) => {
  //   await db
  //     .collection("user")
  //     .doc(uid)
  //     .get()
  //     .then((snapshot) => {
  //       dispatch(saveUserRole(snapshot.data().role));
  //       let list = snapshot.data().circleList;
  //       if (list.length > 0) {
  //         dispatch(saveCircleList(list));
  //       }
  //     });
  // };
  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <div className="login">
      {isLoading ? (
        <>
          {isLogin ? (
            <div className="headerContent sbHeaderContent">
              <ContentComponent dispatch={dispatch} />
            </div>
          ) : (
            <div className="headerContent rightHeaderContent">
              <LoginComponent />
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
