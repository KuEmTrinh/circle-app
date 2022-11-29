import React from "react";
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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MyCircleItem({ circle }) {
  ///
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    handleClose();
    setOpenDialog(false);
  };
  ///
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClickMoreHorizIcon = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const openCircleEditDialog = () => {
    handleClickOpenDialog();
  };

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
            <Button autoFocus color="inherit" onClick={handleCloseDialog}>
              保存
            </Button>
          </Toolbar>
        </AppBar>
        <EditCircle circle={circle}></EditCircle>
      </Dialog>
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
                      <MenuItem className="menuPopup" onClick={handleClose}>
                        <DeleteIcon
                          className="menuPopupIcon"
                          fontSize="small"
                        />
                        サークル削除
                      </MenuItem>
                    </MenuList>
                  </Typography>
                </Popover>
              </>
            }
          />

          <Link to={circle.id + "/circle_home"}>
            <CardMedia
              component="img"
              height="100"
              image="https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1265&q=80"
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
  let circleJoinedList = useSelector((state) => state.login.circleList);
  // console.log(circleJoinedList);
  const [circleList, setCircleList] = useState();
  useEffect(() => {
    if (circleJoinedList.length > 0) {
      fetchCircleData(circleJoinedList);
    }
  }, [circleJoinedList]);
  const fetchCircleData = (circleJoinedList) => {
    if (circleJoinedList) {
      const query = db
        .collection("circle")
        .where(
          firebase.firestore.FieldPath.documentId(),
          "in",
          circleJoinedList
        )
        .get()
        .then((querySnapshot) => {
          const data = [];
          querySnapshot.docs.map((doc) => {
            let item = doc.data();
            item.id = doc.id;
            data.push(item);
          });
          // console.log(data);
          setCircleList(data);
        });
      return query;
    }
  };
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
          ""
        )}
      </div>
    </>
  );
}
