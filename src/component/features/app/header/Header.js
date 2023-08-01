import React, { useEffect, useState } from "react";
import "./Header.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { authentication, db } from "../../../../app/firebase";
import { signOut } from "firebase/auth";
import { firebase } from "../../../../app/firebase";
import { useDispatch, useSelector } from "react-redux";
import { saveLoginInfo, deleteUserInfo } from "../../../slice/loginSlice";

import Login from "./Login";

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
        localStorage.removeItem("userToken");
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

export default function Header() {
  let userToken = useSelector((state) => state.login.token);
  useEffect(() => {
    getInfomationWithLDAPUserToken(userToken);
  }, [userToken]);

  const getInfomationWithLDAPUserToken = (id) => {
    getUserWithLDAPUserTokenId(id);
  };

  const getUserWithLDAPUserTokenId = async (id) => {
    const userData = await db
      .collection("user")
      .doc(id)
      .onSnapshot((querySnapshot) => {
        dispatch(saveLoginInfo(querySnapshot.data()));
        return setIsLogin(true);
      });

    return userData;
  };

  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const getUserInfomation = async (user) => {
    db.collection("user")
      .doc(user.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          dispatch(saveLoginInfo(doc.data()));
        }
      });
  };

  const checkLoginWithGmail = async () => {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        getUserInfomation(user);
        return setIsLogin(true);
      } else {
        return setIsLogin(false);
      }
    });
    setIsLoading(true);
  };

  const checkLogin = async () => {
    try {
      await checkLoginWithGmail();
    } catch (error) {
      console.log("error");
    }
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
              <ContentComponent dispatch={dispatch} />
            </div>
          ) : (
            <div className="headerContent rightHeaderContent">
              <Login />
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
