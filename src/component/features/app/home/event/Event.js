import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useEffect, useState } from "react";
import { pink } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import "./Event.css"
import EditEvent from "./EditEvent"
import CreateEvent from './CreateEvent';
import { useParams } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Event() {
  let { circleId } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [typeOfActive, setTypeOfActive] = useState(); // ["createEvent", "editEven"]

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
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const openCircleEditDialog = () => {
    handleClickOpenDialog();
  };

  return (
    <>


      <div className='eventPage'>
        <div className='eventList'>

          <div className='eventItem'>
            <div className='eventName'>福岡サッカーCompetition</div>
            <div className='eventImage'>
              <img src="https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"></img>
            </div>
            <div className='eventTimeBox'>
              <span className='eventTimeText'> 日時</span>
              <span className='eventTime'>9/24-10/30</span>
            </div>
            <div className='eventPlaceBox'></div>
            <div className='eventMoneyBox'></div>
            <div className='eventPeopleBox'></div>
            <div className='eventContentBox'></div>
            <div className='eventSetting' >
              <MoreHorizIcon fontSize="large" onClick={handleClick}></MoreHorizIcon>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
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
                        setTypeOfActive("editEvent")
                      }}
                    >
                      <ModeEditIcon
                        className="menuPopupIcon"
                        fontSize="small"
                      />
                      イベント編集
                    </MenuItem>
                    <MenuItem className="menuPopup" onClick={handleClose}>
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
        </div>
        <div className='eventAdd'>
          <div className='eventAddIcon'>
            <AddIcon fontSize='large' sx={{ color: pink[50] }} onClick={() => { openCircleEditDialog(); setTypeOfActive("createEvent") }}></AddIcon>
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
            {typeOfActive=="editEvent"&&
                  "イベント編集"
             }
             {typeOfActive=="createEvent"&&
                   "イベント追加"
             }
            </Typography>
            <Button autoFocus color="inherit" onClick={handleCloseDialog}>
              保存
            </Button>
          </Toolbar>
        </AppBar>
        <>
          <div>
             {typeOfActive=="editEvent"&&
                    <EditEvent circleId={ circleId }></EditEvent>
             }
             {typeOfActive=="createEvent"&&
                    <CreateEvent circleId={circleId}></CreateEvent>
             }
          </div>
        </>
      </Dialog>
    </>
  )
}
