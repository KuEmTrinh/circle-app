import React, { useState, useEffect } from "react";
// import Button from "../../../ui/ButtonComponent";
import Modal from "../../../ui/Modal";
import TextField from "@mui/material/TextField";
import "./Account.css";
import TitleText from "../../../ui/TitleText";
import ButtonComponent from "../../../ui/ButtonComponent";
import { db } from "../../../../app/firebase";
import { storage } from "../../../../app/firebase";
import { firebase } from "../../../../app/firebase";
import { useSelector } from "react-redux";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import imageCompression from "browser-image-compression";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BadgeIcon from "@mui/icons-material/Badge";
import WcIcon from "@mui/icons-material/Wc";
import SchoolIcon from "@mui/icons-material/School";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import Button from "@mui/material/Button";
import GroupsIcon from "@mui/icons-material/Groups";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
function NewCircleComponent({ userInfo }) {
  // let userInfo = useSelector((state) => state.login.data);
  const confirmModal = () => {
    setConfirmToggle(true);
  };
  const [createCircleToggle, setCreateCircleToggle] = useState(false);
  const [confirmToggle, setConfirmToggle] = useState(false);
  const [percent, setPercent] = useState(0);
  const [resultBox, setResultBox] = useState(false);
  const [file, setFile] = useState("");
  const [fileMembers, setFileMember] = useState("");
  const [preview, setPreview] = useState();
  const [circleType, setCircleType] = useState("");
  const [creatNewCircleInfor, setCreateNewCircleInfor] = useState({
    registerUid: userInfo.uid,
    registerUsername: userInfo.displayName,
    registerUserEmail: userInfo.email,
    registerUserPhotoURL: userInfo.photoURL,
    name: "",
    members: 0,
    terms: "",
    money: 0,
    motivation: "",
    status: false,
    fileMembers: fileMembers,
  });

  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleChangeCircleType = (event) => {
    setCircleType(event.target.value);
  };

  const handleChangeImage = async (event) => {
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 400,
      useWebWorker: true,
    };
    try {
      const file = event.target.files[0];
      const compressedFile = await imageCompression(file, options);
      setFile(compressedFile);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    setCreateNewCircleInfor({
      ...creatNewCircleInfor,
      [e.target.name]: e.target.value,
    });
  };

  const setNormalInfo = async () => {
    setCreateNewCircleInfor({
      registerUid: userInfo.uid,
      registerUsername: userInfo.displayName,
      registerUserEmail: userInfo.email,
      registerUserPhotoURL: userInfo.photoURL,
      name: "",
      members: 0,
      money: 0,
      motivation: "",
      status: false,
      fileMembers: fileMembers,
    });
    await setCreateCircleToggle(false);
    await setConfirmToggle(false);
  };
  const confirmCreateCircle = async (url) => {
    console.log(url);
    const circleInfo = JSON.parse(JSON.stringify(creatNewCircleInfor));
    let time = firebase.firestore.FieldValue.serverTimestamp();
    circleInfo.createdAt = time;
    circleInfo.imgUrl = url;
    circleInfo.circleType = circleType;
    await db.collection("circle").add(circleInfo);
    await setNormalInfo();
  };
  const handleUpload = () => {
    if (!file) {
      const url =
        "https://us.123rf.com/450wm/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016/167492439-no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-comin.jpg?ver=6";
      confirmCreateCircle(url);
    } else {
      setResultBox(true);
      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // downbload url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            confirmCreateCircle(url);
          });
        }
      );
    }
  };

  const handleOnChange = (e) => {
    setFileMember(e.target.files[0]);
  };

  return (
    <>
      <Modal
        className="creatNewCircleModal"
        show={createCircleToggle}
        onClose={() => {
          setCreateCircleToggle(false);
        }}
      >
        <TitleText>サークル新規</TitleText>
        <div className="creatNewCircleModalInputBox">
          {preview ? (
            <div className="circleImagePreview">
              {file && <img src={preview} />}
            </div>
          ) : (
            ""
          )}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">サークル選択</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={circleType}
              label="サークル選択"
              onChange={handleChangeCircleType}
            >
              <MenuItem value={"五者執行部"}>五者執行部</MenuItem>
              <MenuItem value={"体育会系"}>体育会系</MenuItem>
              <MenuItem value={"学術文化系"}>学術文化系</MenuItem>
              <MenuItem value={"任意団体愛好会"}>任意団体愛好会</MenuItem>
            </Select>
          </FormControl>
          <div className="inputBox">
            <label for="accountSettingInput">
              <div className="accountSettingInputUpload">
                <div className="imageInputTitle">
                  <FileUploadIcon></FileUploadIcon>
                  <p>写真を選択</p>
                </div>
                <input
                  className="inputSetting"
                  onChange={handleChangeImage}
                  id="accountSettingInput"
                  type="file"
                ></input>
              </div>
            </label>
          </div>
          <TextField
            className="createNewCircleTextField"
            label="名称"
            inputProps={{ maxLength: 25 }}
            name="name"
            onChange={handleChange}
          ></TextField>
          <TextField
            className="createNewCircleTextField"
            label="設立の目的"
            multiline
            rows={4}
            name="motivation"
            onChange={handleChange}
          ></TextField>
          <TextField
            className="createNewCircleTextField"
            label="規約"
            name="terms"
            onChange={handleChange}
          ></TextField>
          <div>
            <a
              href="https://www.kyusan-u.ac.jp/campus/life/circle/document/files/17_%E5%BD%B9%E5%93%A1%E5%90%8D%E7%B0%BF.doc"
              download="proposed_file_name"
            >
              Download 役員名簿.doc
            </a>
          </div>
          <div className="chooseFileButoon">
            <input type="file" name="fileMembers" onChange={handleChange} />
          </div>
        </div>
        <div className="creatNewCircleModalButtonBox">
          <ButtonComponent
            onClick={() => {
              confirmModal();
            }}
          >
            申請
          </ButtonComponent>
        </div>
      </Modal>
      <Modal
        closeIcon="none"
        show={confirmToggle}
        className="confirmModal"
        onClose={() => {
          setConfirmToggle(false);
        }}
      >
        <p className="subTitle">情報を確認してください！</p>
        <div className="center">
          <ButtonComponent
            onClick={() => {
              handleUpload();
            }}
          >
            確認
          </ButtonComponent>
        </div>
      </Modal>
      <Button
        variant="outlined"
        fullWidth
        onClick={() => {
          setCreateCircleToggle(true);
        }}
      >
        新しサークル新規
      </Button>
      {/* {console.log(fileMembers)} */}
    </>
  );
}
function UserEdit({ userInfo }) {
  // let userInfo = useSelector((state) => state.login.data);
  const userId = userInfo.uid;
  const [toggle, setToggle] = useState(false);
  const [name, setName] = useState(userInfo.name);
  const [userCode, setUserCode] = useState(userInfo.userCode);
  const [userFaculty, setUserFaculty] = useState(userInfo.userFaculty);
  const [sex, setSex] = useState(userInfo.sex);
  const [userPhone, setUserPhone] = useState(userInfo.userPhone);

  const userInfoConfirm = () => {
    const query = db.collection("user").doc(userId).update({
      name: name,
      userCode: userCode,
      userFaculty: userFaculty,
      sex: sex,
      userPhone: userPhone,
    });
    return query;
  };

  return (
    <>
      <Button
        variant="outlined"
        fullWidth
        onClick={() => {
          setToggle(true);
        }}
      >
        アカウント情報管理
      </Button>

      <Modal
        show={toggle}
        onClose={() => {
          setToggle(false);
        }}
      >
        <div className="createNewAccount">
          <TitleText>アカウント登録</TitleText>
          <div className="creatNewAccountInputBox">
            <div className="mt-1"></div>
            <TextField
              className="createNewAccountTextField"
              label="学籍番号"
              inputProps={{ maxLength: 25 }}
              name="name"
              fullWidth
              value={userCode}
              onChange={(e) => {
                setUserCode(e.target.value);
              }}
            ></TextField>
            <div className="mt-1"></div>

            <TextField
              className="createNewAccountTextField"
              label="名前"
              inputProps={{ maxLength: 25 }}
              name="time"
              fullWidth
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></TextField>
            <div className="mt-1"></div>

            <TextField
              className="createNewAccountTextField"
              label="学部・学科"
              inputProps={{ maxLength: 25 }}
              name="place"
              fullWidth
              value={userFaculty}
              onChange={(e) => {
                setUserFaculty(e.target.value);
              }}
            ></TextField>
            <div className="mt-1"></div>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sex}
                label="性別"
                onChange={(event) => {
                  setSex(event.target.value);
                }}
              >
                <MenuItem value={1}>男</MenuItem>
                <MenuItem value={2}>女</MenuItem>
              </Select>
            </FormControl>
            <div className="mt-1"></div>

            <TextField
              className="createNewAccountTextField"
              label="電話番号"
              inputProps={{ maxLength: 25 }}
              fullWidth
              value={userPhone}
              onChange={(e) => {
                setUserPhone(e.target.value);
              }}
            ></TextField>
            <div className="mt-1 center">
              <ButtonComponent
                onClick={async () => {
                  await userInfoConfirm();
                  await setToggle(false);
                }}
              >
                登録
              </ButtonComponent>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default function Account() {
  let userInfo = useSelector((state) => state.login.data);
  const changeRoleName = (role) => {
    if (role == "user") {
      return "一般";
    } else if (role == "systemAdmin") {
      return "管理者";
    } else {
      return "未定"
    }
  };
  return (
    <div className="userInfomationComponent">
      <div className="userInfomationBox">
        <div className="userInfomationIcon">
          <div className="userInfomationItem">
            <PersonIcon color="primary"></PersonIcon>
          </div>
          <p className="userInfomationTitle">アカウント情報</p>
        </div>
        <div className="userInfomationHeader">
          <div className="userInfomationHeaderContent">
            <p className="userInfomationName">{userInfo.name}</p>
            <p className="userInfomationEmail">{userInfo.email}</p>
          </div>
          <div className="userInfomationHeaderAvatar">
            <img src={userInfo.photoURL}></img>
          </div>
        </div>

        <div className="userInfomationSection">
          <div className="userInfomationSectionIcon">
            <AccountCircleIcon color="deepGrey"></AccountCircleIcon>
            <p className="userInfomationSectionName">権利</p>
          </div>
          <div className="userInfomationSectionContent">
            <Stack direction="row" spacing={1}>
              {userInfo.role.map((item) => {
                return <Chip label={changeRoleName(item)} color="primary" />;
              })}
            </Stack>
          </div>
        </div>
        <div className="userInfomationSection">
          <div className="userInfomationSectionIcon">
            <BadgeIcon color="deepGrey"></BadgeIcon>
            <p className="userInfomationSectionName">学籍番号</p>
          </div>
          <div className="userInfomationSectionContent">
            <p>{userInfo.userCode ? userInfo.userCode : "未登録"}</p>
          </div>
        </div>
        <div className="userInfomationSection">
          <div className="userInfomationSectionIcon">
            <WcIcon color="deepGrey"></WcIcon>
            <p className="userInfomationSectionName">性別</p>
          </div>
          <div className="userInfomationSectionContent">
            {userInfo.sex ? (
              <>
                <p>{userInfo.sex === 1 ? "男" : "女"}</p>
              </>
            ) : (
              <p>未登録</p>
            )}
          </div>
        </div>
        <div className="userInfomationSection">
          <div className="userInfomationSectionIcon">
            <SchoolIcon color="deepGrey"></SchoolIcon>
            <p className="userInfomationSectionName">学部・学科</p>
          </div>
          <div className="userInfomationSectionContent">
            <p>{userInfo.userFaculty ? userInfo.userFaculty : "未登録"}</p>
          </div>
        </div>
        <div className="userInfomationSection">
          <div className="userInfomationSectionIcon">
            <ContactPhoneIcon color="deepGrey"></ContactPhoneIcon>
            <p className="userInfomationSectionName">電話番号</p>
          </div>
          <div className="userInfomationSectionContent">
            <p>{userInfo.userPhone ? userInfo.userPhone : "000-000-000"}</p>
          </div>
        </div>
        <UserEdit userInfo={userInfo}></UserEdit>
        <div className="userInfomationIcon mt-1">
          <div className="userInfomationItem">
            <GroupsIcon color="primary"></GroupsIcon>
          </div>
          <p className="userInfomationTitle">サークル情報</p>
        </div>
        <div className="userInfomationSection">
          <div className="userInfomationSectionIcon">
            <GroupsIcon color="deepGrey"></GroupsIcon>
            <p className="userInfomationSectionName">参加済み</p>
          </div>
          <div className="userInfomationSectionContent">
            <p>{userInfo.circleList?.length}</p>
          </div>
        </div>
        <NewCircleComponent userInfo={userInfo}></NewCircleComponent>
      </div>
    </div>
  );
}
