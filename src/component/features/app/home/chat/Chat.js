import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../../../app/firebase";
import { firebase } from "../../../../../app/firebase";
import { useSelector } from "react-redux";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import imageCompression from "browser-image-compression";
import ImageViewer from "react-simple-image-viewer";

function ChatRoomInputBox({ circleId }) {
  const user = useSelector((state) => state.login.data);
  const [chatMessage, setChatMessage] = useState();
  const fileInputRef = useRef(null); // Ref for the file input
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  useEffect(() => {
    if (!file) {
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);
  //function
  const handleChangeMessage = async (e) => {
    setChatMessage(e.target.value);
  };
  const handleAttachFile = () => {
    fileInputRef.current.click(); // Trigger the file input when the AttachFileIcon is clicked
  };
  const handleUpdateImage = async () => {
    try {
      if (!file) {
        const url =
          "https://us.123rf.com/450wm/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016/167492439-no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-comin.jpg?ver=6";
        return url;
      } else {
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        await uploadTask;
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        return url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file
    // Do whatever you want with the selected file here (e.g., upload to storage)
    console.log("Selected file:", selectedFile);
  };
  const sendMessage = async () => {
    let currentMessage = await chatMessage;
    await setChatMessage("");
    let responseUrl = "";
    if (file) {
      responseUrl = await handleUpdateImage();
      await db.collection("circle").doc(circleId).collection("chat").add({
        message: currentMessage,
        userName: user.name,
        userPhoto: user.photoURL,
        imageUrl: responseUrl,
        userId: user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setFile("");
      setPreview("");
    } else {
      await db.collection("circle").doc(circleId).collection("chat").add({
        message: currentMessage,
        userName: user.name,
        userPhoto: user.photoURL,
        userId: user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };
  const handleFileSelect = async (event) => {
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
  return (
    <div className="center">
      <div className="chatInputBox">
        <div className="chatImagePreview">
          {preview ? <img src={preview} /> : ""}
        </div>
        <TextField
          id="outlined-multiline-flexible"
          label="メッセージ"
          multiline
          maxRows={4}
          size="small"
          fullWidth
          value={chatMessage}
          onChange={handleChangeMessage}
          InputProps={{
            endAdornment: (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileSelect}
                />
                <AttachFileIcon
                  fontSize="small"
                  className="attachFileIcon"
                  color="primary"
                  sx={{ mr: 1 }}
                  onClick={handleAttachFile}
                  // Add any additional props for the AttachFileIcon here if needed
                />
                <SendIcon
                  fontSize="small"
                  color="primary"
                  // className="sendIcon"
                  onClick={sendMessage}
                />
              </>
            ),
          }}
        />

        {/* <div className="chatSendIcon center">
          <div
            className="wrapChatSendIcon"
            onClick={() => {
              sendMessage();
            }}
          >
            <SendIcon
              fontSize="small"
              color="whiteColor"
              className="sendIcon"
            ></SendIcon>
          </div>
        </div> */}
      </div>
    </div>
  );
}

function ChatMessage({ message, userId, messagePre }) {
  let show = true;
  if (messagePre?.userId == message?.userId) {
    show = false;
  }
  return (
    <>
      {userId == message.userId ? (
        <>
          {show ? (
            <div className="messageItemLeft">
              <div className="messageBody">
                <p className="messageUserName messageUserNameLeft">
                  {message.userName}
                </p>
                <div className="messageContentLeft">
                  <div className="messageText">{message.message}</div>
                </div>
              </div>
              <div className="messagePhoto">
                <img
                  src={message.userPhoto}
                  alt=""
                  className="messageUserPhoto"
                />
              </div>
            </div>
          ) : (
            <div className="messageItemLeftOnly">
              <div className="messageBody">
                <div className="messageContentLeftOnly">
                  <div className="messageText">{message.message}</div>
                </div>
                {message.imageUrl ? (
                  <ChatImageViewer imageUrl={message.imageUrl} />
                ) : (
                  ""
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {show ? (
            <div className="messageItem">
              <div className="messagePhoto">
                <img
                  src={message.userPhoto}
                  alt=""
                  className="messageUserPhoto"
                />
              </div>
              <div className="messageBody">
                <p className="messageUserName">{message.userName}</p>
                <div className="messageContent">
                  <div className="messageText">{message.message}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="messageItemOnly">
              <div className="messageBody">
                <div className="messageContent">
                  <div className="messageText">{message.message}</div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

function ChatMessages({ circleId }) {
  const [messages, setMessages] = useState();
  const userId = useSelector((state) => state.login.data.uid);
  const messagesEndPoint = useRef();
  useEffect(() => {
    getMessages();
  }, []);

  //function
  const getMessages = () => {
    const query = db
      .collection("circle")
      .doc(circleId)
      .collection("chat")
      .orderBy("createdAt", "asc")
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.docs.map((doc) => {
          data.push(doc.data());
        });
        setMessages(data);
        messagesEndPoint.current?.scrollIntoView({ behavior: "smooth" });
      });
    return query;
  };
  return (
    <>
      {messages ? (
        <div className="center">
          <div className="messagesBox">
            {messages.map((message, index) => {
              return (
                <ChatMessage
                  messagePre={messages[index - 1]}
                  message={message}
                  userId={userId}
                  index={index}
                />
              );
            })}
            <div ref={messagesEndPoint}></div>
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </>
  );
}

function ChatRoom({ circleId }) {
  return (
    <>
      <ChatMessages circleId={circleId}></ChatMessages>
      <ChatRoomInputBox circleId={circleId} />
    </>
  );
}

function ChatImageViewer({ imageUrl }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = [imageUrl];

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  return (
    <>
      {/* <div className="messageImage">
        <img src="" />
      </div> */}
      {images.map((src, index) => (
        <div className="messageImage">
          <img
            src={src}
            onClick={() => openImageViewer(index)}
            width="300"
            key={index}
            style={{ margin: "2px" }}
            alt=""
          />
        </div>
      ))}
      {isViewerOpen && (
        <ImageViewer
          src={images}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
          closeOnClickOutside={true}
        />
      )}
    </>
  );
}

export default function Chat() {
  let { circleId } = useParams();
  return <>{circleId ? <ChatRoom circleId={circleId} /> : ""}</>;
}
