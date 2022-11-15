import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import ButtonComponent from "../../../ui/ButtonComponent";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useEffect, useState } from "react";
import { db } from "../../../../app/firebase";
import { firebase } from "../../../../app/firebase";
import { useSelector } from "react-redux";
function MyCircleItem({ circle }) {
  return (
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
  );
}

export default function Home() {
  let circleId = "jazyNqrjDziBoPjOKxfM";
  // get myCircleList
  let userInfo = useSelector((state) => state.login.data);
  let circleJoinedList = useSelector((state) => state.login.circleList);
  // console.log(userInfo.uid);
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
