import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "../../../../ui/Modal";
import TitleText from "../../../../ui/TitleText";
import ButtonComponent from "../../../../ui/ButtonComponent";
import { db } from "../../../../../app/firebase";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function ChatMessageAction(props) {
  const reactions = [
    {
      icon: <ThumbUpIcon />,
      label: "like",
    },
    {
      icon: <ThumbDownIcon />,
      label: "dislike",
    },
    {
      icon: <FavoriteIcon />,
      label: "heart",
    },
  ];
  const handleReaction = async (action) => {
    try {
      const updatedReactionValue = !reaction[action];
      setReaction((prev) => ({
        ...prev,
        [action]: updatedReactionValue,
      }));
      const updateObject = {
        [`${action}`]: updatedReactionValue,
      };
      const reactionQuery = await db
        .collection("circle")
        .doc(props.circleId)
        .collection("chat")
        .doc(props.message.id)
        .update({
          react: {
            updateObject,
          },
        });

      return reactionQuery;
    } catch (error) {}
  };
  const [reaction, setReaction] = useState(props.message.react);
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
    // console.log(props.message);
    // console.log(props.circleId);
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
            onClick={() => {
              handleReaction(reaction.label);
            }}
          >
            {reaction.icon}
          </IconButton>
        ))}
      </Stack>
    </>
  );
}
