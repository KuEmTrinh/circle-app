import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "../../../../ui/Modal";
import TitleText from "../../../../ui/TitleText";
import ButtonComponent from "../../../../ui/ButtonComponent";
import { db, firebase } from "../../../../../app/firebase";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";

export default function ChatMessageAction(props) {
  const userInfo = useSelector((state) => state.login.data);
  const reactionsData = props.message?.reactions;
  const getEnableData = (label) => {
    if (reactionsData != null && reactionsData[label] != null) {
      return reactionsData[label]?.includes(userInfo.uid);
    }
    return false;
  };
  const reactions = [
    {
      icon: <ThumbUpIcon />,
      label: "like",
      enable: getEnableData("like"),
    },
    {
      icon: <ThumbDownIcon />,
      label: "dislike",
      enable: getEnableData("dislike"),
    },
    {
      icon: <FavoriteIcon />,
      label: "heart",
      enable: getEnableData("heart"),
    },
  ];
  const handleReaction = async (action, type) => {
    try {
      let uid = userInfo.uid;
      let updateObj = {};

      // Determine which array to update based on the action
      if (action === "like" || action === "dislike" || action === "heart") {
        if (type === false) {
          // Add uid to the array
          updateObj[`reactions.${action}`] =
            firebase.firestore.FieldValue.arrayUnion(uid);
        } else if (type === true) {
          // Remove uid from the array
          updateObj[`reactions.${action}`] =
            firebase.firestore.FieldValue.arrayRemove(uid);
        } else {
          // Handle unexpected type values
          throw new Error("Invalid type");
        }
      } else {
        // Handle unexpected action values
        throw new Error("Invalid action");
      }

      const reactionQuery = await db
        .collection("circle")
        .doc(props.circleId)
        .collection("chat")
        .doc(props.message.id)
        .update(updateObj);

      return reactionQuery;
    } catch (error) {
      // Handle or log the error
      console.error("Error updating document: ", error);
    }
  };
  // const [reaction, setReaction] = useState(props.message.react);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [messageContent, setMessagesContent] = useState(props.message.message);
  const handleShowEditModal = () => {
    setShowEditModal(true);
  };
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteMessage = async () => {
    const deleteQuery = await db
      .collection("circle")
      .doc(props.circleId)
      .collection("chat")
      .doc(props.message.id)
      .delete();
    props.handleClose();

    return deleteQuery;
  };

  const confirmEditMessage = async () => {
    const editQuery = await db
      .collection("circle")
      .doc(props.circleId)
      .collection("chat")
      .doc(props.message.id)
      .update({
        message: messageContent,
      });
    props.handleClose();
    return editQuery;
  };

  const getColor = (enable) => {
    if (enable) {
      return "primary";
    }
    return;
  };

  const getType = (enable) => {
    if (enable) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <Modal
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
        }}
      >
        <TitleText>削除しますか？</TitleText>
        <ButtonComponent onClick={confirmDeleteMessage}>確認</ButtonComponent>
      </Modal>

      <Modal
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false);
        }}
      >
        <TitleText>メッセージ編集</TitleText>
        <TextField
          id="outlined-basic"
          label="メッセージ"
          variant="outlined"
          fullWidth
          value={messageContent}
          onChange={(e) => {
            setMessagesContent(e.target.value);
          }}
        />
        <ButtonComponent onClick={confirmEditMessage}>確認</ButtonComponent>
      </Modal>

      <Stack direction="row">
        <IconButton aria-label="delete">
          <EditIcon onClick={handleShowEditModal} />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon onClick={handleShowDeleteModal} />
        </IconButton>
        <Divider orientation="vertical" flexItem />
        {reactions.map((reaction, index) => (
          <IconButton
            key={index}
            aria-label={reaction.label}
            onClick={async () => {
              let typeHandle = await getType(reaction?.enable);
              handleReaction(reaction.label, typeHandle);
            }}
            color={getColor(reaction?.enable)}
          >
            {reaction.icon}
          </IconButton>
        ))}
      </Stack>
    </>
  );
}
