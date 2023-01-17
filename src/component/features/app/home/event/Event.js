import React from "react";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useEffect, useState } from "react";
import { pink } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import "./Event.css";
import EditEvent from "./EditEvent";
import CreateEvent from "./CreateEvent";
import { useParams } from "react-router-dom";
import { db } from "../../../../../app/firebase";
import Modal from "../../../../ui/Modal";
import TitleText from "../../../../ui/TitleText";
import ButtonComponent from "../../../../ui/ButtonComponent";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../../../app/firebase";
import TimerIcon from "@mui/icons-material/Timer";
import PlaceIcon from "@mui/icons-material/Place";
import PaymentsIcon from "@mui/icons-material/Payments";
import GroupIcon from "@mui/icons-material/Group";
import EventNoteIcon from "@mui/icons-material/EventNote";
import "./Event.css";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Event() {
  let { circleId } = useParams();
  const [file, setFile] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [typeOfActive, setTypeOfActive] = useState(); // ["createEvent", "editEven"]
  const [eventDeleteToggle, setEventDeleteToggle] = useState(false);
  const [eventDeleteId, setEventDeleteId] = useState();
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    handleClose();
    setOpenDialog(false);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const openCircleEditDialog = () => {
    handleClickOpenDialog();
  };
  // Get currentEvent
  const [events, setEvents] = useState();
  const [editEvent, setEditEvent] = useState(null);
  const getEvents = () => {
    const query = db
      .collection("circle")
      .doc(circleId)
      .collection("event")
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.docs.map((doc) => {
          let item = doc.data();
          item.id = doc.id;
          data.push(item);
        });
        setEvents(data);
      });

    return query;
  };
  useEffect(() => {
    getEvents();
  }, []);
  // Create Event Function
  const [newEventInfor, setNewEventInfor] = useState();
  const callbackFunction = (childData) => {
    setNewEventInfor(childData);
  };

  const [editEventInfo, setEditEventInfo] = useState();
  const callbackEditFunction = (childData) => {
    setEditEventInfo(childData);
  };

  const confirmCreateEvent = (url) => {
    let createItem = { ...newEventInfor };
    createItem.photoUrl = url;
    const query = db
      .collection("circle")
      .doc(circleId)
      .collection("event")
      .add(createItem);
    return query;
  };
  const createEvent = () => {
    if (!file) {
      const url =
        "https://us.123rf.com/450wm/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016/167492439-no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-comin.jpg?ver=6";
      confirmCreateEvent(url);
    } else {
      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (err) => console.log(err),
        () => {
          // downbload url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            confirmCreateEvent(url);
          });
        }
      );
    }
  };

  const editEventConfirm = () => {
    console.log("update");
    const query = db
      .collection("circle")
      .doc(circleId)
      .collection("event")
      .doc(editEventInfo.id)
      .update(editEventInfo);
    return query;
  };

  const deleteEventOpenToggle = (id) => {
    setEventDeleteToggle(true);
    setEventDeleteId(id);
  };

  const eventDeleteConfirm = async () => {
    const query = await db
      .collection("circle")
      .doc(circleId)
      .collection("event")
      .doc(eventDeleteId)
      .delete();
    await setEventDeleteToggle(false);
    return query;
  };

  // RENDER
  return (
    <>
      <Modal
        show={eventDeleteToggle}
        onClose={() => {
          setEventDeleteToggle(false);
        }}
      >
        <TitleText>本当に削除したいですか？</TitleText>
        <div className="center">
          <ButtonComponent
            onClick={() => {
              eventDeleteConfirm();
            }}
          >
            はい
          </ButtonComponent>
        </div>
      </Modal>
      <div className="eventPage">
        <div className="eventList">
          {events ? (
            <>
              {events?.map((event, index) => {
                return (
                  <>
                    <div className="eventItem">
                      <div className="userInfomationBox">
                        <div className="eventImage">
                          <img src={event.photoUrl}></img>
                        </div>
                        <div className="userInfomationSection">
                          <div className="eventName">
                            <p>{event.name}</p>
                          </div>
                          <div className="eventSetting">
                            <div className="eventSettingIcon">
                              <MoreHorizIcon
                                onClick={(e) => {
                                  setEditEvent(event);
                                  handleClick(e);
                                }}
                                color={"primary"}
                              ></MoreHorizIcon>
                            </div>
                            <Popover
                              id={id}
                              open={open}
                              anchorEl={anchorEl}
                              onClose={handleClose}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                            >
                              <Typography>
                                <MenuList
                                  className="circlePopup"
                                  autoFocusItem={open}
                                  id="composition-menu"
                                  aria-labelledby="composition-button"
                                >
                                  <MenuItem
                                    className="menuPopup"
                                    onClick={async () => {
                                      await openCircleEditDialog();
                                      setTypeOfActive("editEvent");
                                    }}
                                  >
                                    <ModeEditIcon
                                      className="menuPopupIcon"
                                      fontSize="small"
                                    />
                                    イベント編集
                                  </MenuItem>
                                  <MenuItem
                                    className="menuPopup"
                                    onClick={() => {
                                      deleteEventOpenToggle(event.id);
                                    }}
                                  >
                                    <DeleteIcon
                                      className="menuPopupIcon"
                                      fontSize="small"
                                    />
                                    イベント削除
                                  </MenuItem>
                                </MenuList>
                              </Typography>
                            </Popover>
                          </div>
                        </div>
                        <div className="userInfomationSection">
                          <div className="userInfomationSectionIcon">
                            <TimerIcon color="deepGrey"></TimerIcon>
                            <p className="userInfomationSectionName">日時</p>
                          </div>
                          <div className="userInfomationSectionContent">
                            <p>{event.time}</p>
                          </div>
                        </div>
                        <div className="userInfomationSection">
                          <div className="userInfomationSectionIcon">
                            <PlaceIcon color="deepGrey"></PlaceIcon>
                            <p className="userInfomationSectionName">場所</p>
                          </div>
                          <div className="userInfomationSectionContent">
                            {event.place}
                          </div>
                        </div>
                        <div className="userInfomationSection">
                          <div className="userInfomationSectionIcon">
                            <PaymentsIcon color="deepGrey"></PaymentsIcon>
                            <p className="userInfomationSectionName">料金</p>
                          </div>
                          <div className="userInfomationSectionContent">
                            <p>{event.money}</p>
                          </div>
                        </div>
                        <div className="userInfomationSection">
                          <div className="userInfomationSectionIcon">
                            <GroupIcon color="deepGrey"></GroupIcon>
                            <p className="userInfomationSectionName">
                              最大人数
                            </p>
                          </div>
                          <div className="userInfomationSectionContent">
                            <p>{event.maxMembers}</p>
                          </div>
                        </div>
                        <div className="userInfomationSection">
                          <div className="userInfomationSectionIcon">
                            <EventNoteIcon color="deepGrey"></EventNoteIcon>
                            <p className="userInfomationSectionName">
                              イベント内容
                            </p>
                          </div>
                          <div className="userInfomationSectionContent">
                            <p>{event.content}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          ) : (
            "loading"
          )}
        </div>
        <div className="eventAdd">
          <div className="eventAddIcon">
            <AddIcon
              fontSize="large"
              sx={{ color: pink[50] }}
              onClick={() => {
                openCircleEditDialog();
                setTypeOfActive("createEvent");
              }}
            ></AddIcon>
          </div>
        </div>
      </div>
      <Dialog
        fullScreen
        open={openDialog}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 1, flex: 1 }} variant="h7" component="div">
              {typeOfActive == "editEvent" && "イベント編集"}
              {typeOfActive == "createEvent" && "イベント追加"}
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                handleCloseDialog();
                if (typeOfActive === "createEvent") {
                  createEvent();
                }
                if (typeOfActive === "editEvent") {
                  editEventConfirm();
                }
              }}
            >
              保存
            </Button>
          </Toolbar>
        </AppBar>
        <>
          <div>
            {typeOfActive == "editEvent" && (
              <EditEvent
                editEvent={editEvent}
                parentCallback={callbackEditFunction}
              ></EditEvent>
            )}
            {typeOfActive == "createEvent" && (
              <CreateEvent
                file={file}
                setFile={setFile}
                circleId={circleId}
                parentCallback={callbackFunction}
              ></CreateEvent>
            )}
          </div>
        </>
      </Dialog>
    </>
  );
}
