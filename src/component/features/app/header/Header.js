import React, { useEffect, useState } from "react";
import "./Header.css";
import Card from "../../../ui/card";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { authentication, db, database } from "../../../../app/firebase";
import { signOut } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebase } from "../../../../app/firebase";
import { useDispatch } from "react-redux";
import { saveLoginInfo } from "../../../slice/loginSlice";
import { deleteLoginInfor } from "../../../slice/loginSlice";
import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore"

// import 



function ContentComponent({ ...props }) {
  const userAuth = collection(database, "userAuth");

  const addUserAuth = async () => {
    const addUserAuth = {
      uid: props.userId,
      username: props.username,
      userPhotoURL: props.photoURL,
      userEmail: props.userEmail
    }
    await addDoc(userAuth, addUserAuth);
  }
  const checkExistUserAuth = () => {
    const checkUserIdArray = [1,2,3]
    getDocs(userAuth)
      .then(res => {
        res.docs.map(doc => {
          checkUserIdArray.push(doc.data().uid);
          // if (!checkUserIdArray.includes(props.userId)) {
          //   // console.log('Different')
          //   addUserAuth();
          // }

        }
        )
      }
      )

      .catch(err => {
        console.log(err)
      })
    const nums=[1,2,3,4];
    nums.push(5,6,7)
    console.log(nums)
    console.log("--------------")
    console.log(checkUserIdArray)
    // console.log(props.userId)
    // console.log(checkUserIdArray.includes(props.userId))
    // if (!checkUserIdArray.includes(props.userId)) {
    //   console.log("Exits")
    // } else {
    //   console.log("Not ton tai")
    // }
  }
  checkExistUserAuth();
  const logout = () => {
    signOut(authentication)
      .then((res) => {
        console.log("da dang xuat");
        // dispatch.deleteLoginInfor(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // addUserAuth();
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
        // addUserAuth();
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
  const [userId, setUserId] = useState("")
  const [username, setUsername] = useState("")
  const [userphotoURL, setPhotoURL] = useState("")
  const [userEmail, setUserEmail] = useState("")

  const checkLogin = async () => {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userInfomation = JSON.stringify(user);
        setUsername(user.displayName);
        setPhotoURL(user.photoURL)
        setUserId(user.uid)
        setUserEmail(user.email)
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
  //  const addUserAuth=()=>{
  //   const userAuth= collection(database,"userAuth");
  //   const addUserAuth={
  //     uid:userId,
  //     username:username,
  //     userPhotoURL:userphotoURL,
  //     userEmail:userEmail
  //   }
  //    addDoc(userAuth,addUserAuth);
  // }

  // addUserAuth();
  return (
    <div className="login">
      {isLoading ? (
        <>
          {isLogin ? (
            <div className="headerContent sbHeaderContent">
              <ContentComponent userId={userId} userEmail={userEmail} username={username} photoURL={userphotoURL} />
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


