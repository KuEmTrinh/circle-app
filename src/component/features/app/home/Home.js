import React, { useRef } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useEffect, useState } from "react";
import { db } from "../../../../app/firebase";
import { firebase } from "../../../../app/firebase";
import { useSelector } from "react-redux";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import EditCircle from "./EditCircle";
import Modal from "../../../ui/Modal";
import ButtonComponent from "../../../ui/ButtonComponent";
import "./EditCircle.css";
import { arrayRemove } from "firebase/firestore";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MyCircleItem({ circle }) {
  console.log(circle);
  const timeLineRef = useRef([]);
  ///
  let userInfo = useSelector((state) => state.login.data);
  const [openDialog, setOpenDialog] = useState(false);
  const [circleDetailsToggle, setCircleDetailsToggle] = useState(false);
  const [editCircleInfo, setEditCircleInfo] = useState("");
  const [memberList, setMemberList] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    handleClose();
    setOpenDialog(false);
  };
  ///
  const handleClickMoreHorizIcon = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openCircleEditDialog = () => {
    handleClickOpenDialog();
  };

  const getDataOfEditCircle = (data) => {
    console.log("data:" + { data });
    setEditCircleInfo(data);
  };
  const sendEditCircleInfo = () => {
    let newCircleInfomation = { ...editCircleInfo };
    newCircleInfomation.timeLine = timeLineRef.current;
    const query = db
      .collection("circle")
      .doc(circle.id)
      .update(newCircleInfomation);
    return query;
  };

  // Function outCircle
  const deleteCircleInCircleListOfUser = () => {
    const query = db
      .collection("user")
      .doc(userInfo.uid)
      .update({
        circleList: arrayRemove(circle.id),
      });
    return query;
  };
  const deleteMemberInMemberOfCircle = () => {
    const query = db
      .collection("circle")
      .doc(circle.id)
      .collection("member")
      .where("userId", "==", userInfo.uid)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });
    console.log("Delete thanh cong");
    return query;
  };
  const outCircle = async () => {
    deleteCircleInCircleListOfUser();
    deleteMemberInMemberOfCircle();
  };

  // ============RENDER===============
  return (
    <>
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
              サークル編集
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                handleCloseDialog();
                sendEditCircleInfo();
              }}
            >
              保存
            </Button>
          </Toolbar>
        </AppBar>
        <EditCircle
          getDataFromChild={getDataOfEditCircle}
          circle={circle}
          timeLineRef={timeLineRef}
        ></EditCircle>
      </Dialog>
      <Modal
        show={circleDetailsToggle}
        onClose={() => {
          setCircleDetailsToggle(false);
        }}
      >
        <p className="subTitle">サークル退部確認</p>
        <p style={{ "margin-bottom": "15px", "font-weight": "bold" }}>
          {circle.name}を退部しますか?
        </p>
        <div className="center sp-ar">
          <ButtonComponent
            mode="cancel"
            onClick={() => {
              setCircleDetailsToggle(false);
            }}
          >
            キャンセル
          </ButtonComponent>
          <ButtonComponent
            onClick={() => {
              outCircle();
              setCircleDetailsToggle(false);
            }}
          >
            退部
          </ButtonComponent>
        </div>
      </Modal>
      <div className="myCircleItem">
        <Card sx={{ minWidth: 200 }}>
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: red[500] }}
                aria-label="recipe"
                src={circle.registerUserPhotoURL}
              />
            }
            title={circle.name}
            subheader={circle.registerUsername}
            action={
              <>
                <IconButton
                  aria-label="settings"
                  aria-describedby={id}
                  variant="contained"
                  onClick={(e) => {
                    handleClickMoreHorizIcon(e);
                  }}
                >
                  <MoreHorizIcon />
                </IconButton>
                {/* {userInfo.email === circle.registerUserEmail && (
                )} */}

                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Typography sx={{}}>
                    <MenuList
                      className="circlePopup"
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                    >
                      {userInfo.email === circle.registerUserEmail && (
                        <MenuItem
                          className="menuPopup"
                          onClick={() => {
                            openCircleEditDialog();
                          }}
                        >
                          <ModeEditIcon
                            className="menuPopupIcon"
                            fontSize="small"
                          />
                          ホーム編集
                        </MenuItem>
                      )}
                      <MenuItem
                        className="menuPopup"
                        onClick={() => {
                          setCircleDetailsToggle(true);
                          handleClose();
                        }}
                      >
                        <DeleteIcon
                          className="menuPopupIcon"
                          fontSize="small"
                        />
                        サークル退部
                      </MenuItem>
                    </MenuList>
                  </Typography>
                </Popover>
              </>
            }
          />

          <Link to={circle.id + "/" + circle.name + "/circle_home"}>
            <CardMedia
              component="img"
              height="100"
              image={circle.imgUrl}
              alt="Paella dish"
            />
          </Link>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    </>
  );
}

export default function Home() {
  // get myCircleList
  let circleJoinedList = useSelector((state) => state.login.data.circleList);
  const [circleList, setCircleList] = useState();
  useEffect(() => {
    if (circleJoinedList != null) {
      getData(circleJoinedList);
    }
  }, [circleJoinedList]);
  async function getData(circleJoinedList) {
    const chunkSize = 10;
    const chunks = [];
    for (let i = 0; i < circleJoinedList.length; i += chunkSize) {
      chunks.push(circleJoinedList.slice(i, i + chunkSize));
    }

    const snapshots = await Promise.all(
      chunks.map((chunk) => {
        return db
          .collection("circle")
          .where(firebase.firestore.FieldPath.documentId(), "in", chunk)
          .get();
      })
    );

    const data = [];
    snapshots
      .flatMap((snapshot) => snapshot.docs)
      .forEach((doc) => {
        let item = doc.data();
        item.id = doc.id;
        data.push(item);
      });
    console.log(data);
    setCircleList(data);
  }
  return (
    <>
      <div className="myCircleList">
        {circleList ? (
          <>
            {circleList.map((circle) => {
              return <MyCircleItem circle={circle}></MyCircleItem>;
            })}
          </>
        ) : (
          "参加したサークルがありません。"
        )}
      </div>
    </>
  );
}
