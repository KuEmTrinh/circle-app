import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "../../../ui/Modal";
import ButtonComponent from "../../../ui/ButtonComponent";
import { db, firebase } from "../../../../app/firebase";

export default function ListButton(props) {
  const [circleDetailsToggle, setCircleDetailsToggle] = useState(false);
  const [disableOpen, setDisableOpen] = useState(false);
  const [unDisableOpen, setUnDisableOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const onConfirmDelete = async (circle) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeDisableStatus = async (circle, action) => {
    console.log("run");
    try {
      await db.collection("circle").doc(circle.id).update({
        isDisable: action,
      });
      await setDisableOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const confirmCircle = async (circle) => {
    try {
      let userName = await getNameForRegister(circle.registerUid);
      await db.collection("circle").doc(circle.id).update({
        status: true,
      });
      await db.collection("circle").doc(circle.id).collection("member").add({
        role: "circleAdmin",
        userName: userName, // Make sure this is a valid string value.
        userId: circle.registerUid,
        userPhotoURL: circle.registerUserPhotoURL,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        status: true,
      });
      await db
        .collection("user")
        .doc(circle.registerUid)
        .update({
          circleList: firebase.firestore.FieldValue.arrayUnion(circle.id),
        });
      // Create notigicaion
      await db
        .collection("user")
        .doc(circle.registerUid)
        .collection("notification")
        .add({
          circleId: circle.id,
          circleName: circle.name,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          message: circle.name + "のサークル申請できました。",
          read: false,
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getNameForRegister = async (uid) => {
    try {
      const query = await db.collection("user").doc(uid).get();
      let userName = query.data().name;
      console.log(userName);
      return userName;
    } catch (error) {}
  };

  return (
    <>
      <Modal
        show={unDisableOpen}
        onClose={() => {
          setUnDisableOpen(false);
        }}
      >
        <p className="subTitle">回復にする？</p>
        <Button
          variant="text"
          onClick={() => {
            setUnDisableOpen(false);
          }}
        >
          キャンセル
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            onChangeDisableStatus(props.circle, false);
          }}
        >
          同意
        </Button>
      </Modal>
      <Modal
        show={disableOpen}
        onClose={() => {
          setDisableOpen(false);
        }}
      >
        <p className="subTitle">休止中にする？</p>
        <ButtonComponent mode="cancel">キャンセル</ButtonComponent>
        <ButtonComponent
          onClick={() => {
            onChangeDisableStatus(props.circle, true);
          }}
        >
          同意
        </ButtonComponent>
      </Modal>
      <Modal
        show={circleDetailsToggle}
        onClose={() => {
          setCircleDetailsToggle(false);
        }}
      >
        <p className="subTitle">情報を確認</p>
        <p>ここはサークル確認情報を追加</p>
        <div className="center sp-ar">
          <ButtonComponent mode="cancel">キャンセル</ButtonComponent>
          <ButtonComponent
            onClick={() => {
              confirmCircle(props.circle);
              setCircleDetailsToggle(false);
            }}
          >
            同意
          </ButtonComponent>
        </div>
      </Modal>
      {props.status == true ? (
        <>
          {props.isDisable == false ? (
            <Button
              variant="contained"
              onClick={() => {
                setDisableOpen(true);
              }}
            >
              休止中
            </Button>
          ) : (
            <>
              <Button variant="text" onClick={() => {}}>
                削除
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setUnDisableOpen(true);
                }}
              >
                回復
              </Button>
            </>
          )}
        </>
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            setCircleDetailsToggle(true);
          }}
        >
          同意
        </Button>
      )}
    </>
  );
}
