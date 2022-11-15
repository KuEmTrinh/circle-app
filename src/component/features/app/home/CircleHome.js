import React from "react";
import CircleMenu from "../../../ui/CircleMenu";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ButtonComponent from "../../../ui/ButtonComponent";
import "./CircleHome.css"
export default function CircleHome() {
  let { circleId } = useParams();
  return (
    <div className="circleHome">
      <CircleMenu></CircleMenu>
      <div className="homeTitle">
        {/* <Link to={"/chat/" + circleId}>
          <ButtonComponent>Click to Chat</ButtonComponent>
        </Link> */}
      </div>
    </div>
  );
}
