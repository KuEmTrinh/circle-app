import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import ButtonComponent from "../../../ui/ButtonComponent";
export default function Home() {
  let circleId = "jazyNqrjDziBoPjOKxfM";
  return (
    <>
      <div className="homeTitle">
        <Link to={"/chat/" + circleId}>
          <ButtonComponent>Click to Chat</ButtonComponent>
        </Link>
      </div>
    </>
  );
}
