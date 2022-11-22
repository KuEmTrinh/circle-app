import React, { useState, useEffect } from "react";
import "./List.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { db } from "../../../../app/firebase";
import { Link } from "react-router-dom";

function CircleItem({ circle }) {
  return (
    <div className="circleItem">
      <Card sx={{ minWidth: 200 }}>
        <CardHeader
          avatar={<Avatar src={circle.registerUserPhotoURL} />}
          title={circle.name}
          subheader={circle.registerUsername}
        />

        <Link to={circle.id + "/circle_details"}>
          <CardMedia
            component="img"
            height="150"
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
  );
}

export default function List() {
  const [circleList, setCircleList] = useState();
  useEffect(() => {
    fetchCircleData();
  }, []);
  const fetchCircleData = () => {
    const query = db
      .collection("circle")
      .where("status", "==", true)
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.docs.map((doc) => {
          let item = doc.data();
          item.id = doc.id;
          data.push(item);
        });
        console.log(data);
        setCircleList(data);
      });
    return query;
  };
  return (
    <div className="listBox">
      <div className="circleListItem">
        {circleList ? (
          <>
            {circleList.map((circle) => {
              return <CircleItem circle={circle}></CircleItem>;
            })}
          </>
        ) : (
          "Loading"
        )}
      </div>
    </div>
  );
}
