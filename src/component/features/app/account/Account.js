import React, { useState, useEffect } from "react";
import Button from "../../../ui/ButtonComponent";
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
function NewCircleComponent() {
  let userInfo = useSelector((state) => state.login.data);
  const confirmModal = () => {
    setConfirmToggle(true);
  };
  const [createCircleToggle, setCreateCircleToggle] = useState(false);
  const [confirmToggle, setConfirmToggle] = useState(false);
  const [percent, setPercent] = useState(0);
  const [resultBox, setResultBox] = useState(false);
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState();
  const [creatNewCircleInfor, setCreateNewCircleInfor] = useState({
    registerUid: userInfo.uid,
    registerUsername: userInfo.displayName,
    registerUserEmail: userInfo.email,
    registerUserPhotoURL: userInfo.photoURL,
    type: "",
    name: "",
    members: 0,
    money: 0,
    motivation: "",
    status: false,
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
      type: "",
      name: "",
      members: 0,
      money: 0,
      motivation: "",
      status: false,
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
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            confirmCreateCircle(url);
          });
        }
      );
    }
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
            label="種類"
            inputProps={{ maxLength: 25 }}
            name="type"
            onChange={handleChange}
          ></TextField>
          <TextField
            className="createNewCircleTextField"
            label="名前"
            inputProps={{ maxLength: 25 }}
            name="name"
            onChange={handleChange}
          ></TextField>
          <TextField
            className="createNewCircleTextField"
            label="人数"
            type="number"
            name="members"
            onChange={handleChange}
          ></TextField>
          <TextField
            className="createNewCircleTextField"
            label="会費"
            type="number"
            name="money"
            onChange={handleChange}
          ></TextField>
          <TextField
            className="createNewCircleTextField"
            label="志望動機"
            multiline
            rows={4}
            name="motivation"
            onChange={handleChange}
          ></TextField>
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
      <div
        className="center"
        onClick={() => {
          setCreateCircleToggle(true);
        }}
      >
        <Button size="medium">Create new Circle</Button>
      </div>
    </>
  );
}

export default function Account() {
  return (
    <>
      <NewCircleComponent></NewCircleComponent>
    </>
  );
}
