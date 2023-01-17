import React, { useEffect } from "react";
import CircleMenu from "../../../ui/CircleMenu";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ButtonComponent from "../../../ui/ButtonComponent";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./CircleHome.css";
import { useDispatch, useSelector } from "react-redux";
import {
  saveCircleInfo,
  saveCircleMembers,
  checkCircleAdmin,
} from "../../../slice/circleSlice";
import { db } from "../../../../app/firebase";
export default function CircleHome() {
  let { circleId, circleName } = useParams();
  const userId = useSelector((state) => state.login.data.uid);
  const dispatch = useDispatch();
  useEffect(() => {
    saveCircleInfomation();
  }, []);

  const checkIsCircleAdmin = async (memberList) => {
    let circleAdmin = await memberList.find((item) => {
      if (item.role == "circleAdmin") {
        return item;
      }
    });
    if (circleAdmin.userId == userId) {
      dispatch(checkCircleAdmin(true));
    } else {
      dispatch(checkCircleAdmin(false));
    }
  };

  const getCircle = async () => {
    const query = await db
      .collection("circle")
      .doc(circleId)
      .collection("member")
      .get()
      .then((snapshot) => {
        try {
          const data = [];
          snapshot.docs.map((doc) => {
            let item = doc.data();
            item.id = doc.id;
            data.push(item);
          });
          checkIsCircleAdmin(data);
          dispatch(saveCircleMembers(data));
        } catch (error) {
          console.log(error);
        }
      });
    return query;
  };

  const saveCircleInfomation = async () => {
    await getCircle();
    let sendItem = await {
      id: circleId,
      name: circleName,
    };
    dispatch(saveCircleInfo(sendItem));
  };
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
