import React, { useEffect, useState } from "react";
import "./Header.css";
import Card from "../../../ui/card";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { authentication } from "../../../../app/firebase";
import { signOut } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebase } from "../../../../app/firebase";
import { useDispatch } from "react-redux";
import { saveLoginInfo } from "../../../slice/loginSlice";
function ContentComponent({...props}) {
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
      <div className="headerUserInformation">
        <img className="headerUserImage" alt="" src={props.photoURL} />
        <div className="headerUserName">
          <p>{props.username}</p>
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
  const [username,setUsername]=useState("")
  const [photoURL,setPhotoURL]=useState("")
  const checkLogin = async () => {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userInfomation = JSON.stringify(user);
        setUsername(user.displayName);
        setPhotoURL(user.photoURL)
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
              <ContentComponent username={username} photoURL={photoURL}/>
            </div>
          ) : (
            <div className="headerContent rightHeaderContent">
              <LoginComponent setUser={setUser}  />
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
