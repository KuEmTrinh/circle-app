import React from "react";
import CircleMenu from "../../../ui/CircleMenu";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ButtonComponent from "../../../ui/ButtonComponent";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./CircleHome.css";
export default function CircleHome() {
  let { circleId } = useParams();
  return (
    <>
      <Link to="/">
        <div className="backButtonBox">
          <ButtonComponent size="small">
            <div className="backButton">
              <div className="backButtonIcon">
                <KeyboardBackspaceIcon fontSize="small"></KeyboardBackspaceIcon>
              </div>
              <p>戻る</p>
            </div>
          </ButtonComponent>
        </div>
      </Link>

      <div className="circleHome">
        <CircleMenu circleId={circleId}></CircleMenu>
        <div className="homeTitle"></div>
      </div>
    </>
  );
}
