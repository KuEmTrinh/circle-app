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
import "./Event.css";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Event() {
  let { circleId } = useParams();
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

  const createEvent = () => {
    const query = db
      .collection("circle")
      .doc(circleId)
      .collection("event")
      .add(newEventInfor);
    return query;
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
        <TitleText>????????????????????????????????????</TitleText>
        <div className="center">
          <ButtonComponent
            onClick={() => {
              eventDeleteConfirm();
            }}
          >
            ??????
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
                      <div className="eventName">{event.name}</div>
                      <div className="eventImage">
                        <img src="https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"></img>
                      </div>
                      <div className="eventTimeBox eventDetailImfor">
                        <span className=""> ??????: </span>
                        <span className="">{event.time}</span>
                      </div>
                      <div className="eventPlaceBox eventDetailImfor">
                        <span className=""> ??????: </span>
                        <span className="">{event.place}</span>
                      </div>
                      <div className="eventMoneyBox eventDetailImfor">
                        <span className=""> ??????: </span>
                        <span className="">{event.money} ???</span>
                      </div>
                      <div className="eventPeopleBox eventDetailImfor">
                        <span className=""> ????????????: </span>
                        <span className="">{event.maxMembers}???</span>
                      </div>
                      <div className="eventContentBox eventDetailImfor">
                        <span className=""> ??????????????????: </span>
                        <span className="">{event.content}</span>
                      </div>
                      <div className="eventSetting">
                        <MoreHorizIcon
                          fontSize="large"
                          onClick={(e) => {
                            setEditEvent(event);
                            handleClick(e);
                          }}
                        ></MoreHorizIcon>
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
                                ??????????????????
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
                                ??????????????????
                              </MenuItem>
                            </MenuList>
                          </Typography>
                        </Popover>
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
              {typeOfActive == "editEvent" && "??????????????????"}
              {typeOfActive == "createEvent" && "??????????????????"}
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
              ??????
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
