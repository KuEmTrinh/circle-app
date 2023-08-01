import React, { useState, useEffect } from "react";
import { db } from "../../../../app/firebase";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./Notifi.css";

export default function Notifi() {
  const userId = useSelector((state) => state.login.data.uid);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifi();
  }, []);

  const fetchNotifi = async () => {
    try {
      const querySnapshot = await db
        .collection("user")
        .doc(userId)
        .collection("notification")
        .orderBy("createdAt", "desc")
        .get();

      const data = querySnapshot.docs.map((doc) => {
        const item = doc.data();
        item.id = doc.id;
        return item;
      });

      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const getJapaneseDay = (secs) => {
    const date = new Date(secs * 1000);
    const months = [
      "1月", "2月", "3月", "4月", "5月", "6月",
      "7月", "8月", "9月", "10月", "11月", "12月",
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${month} ${day}日 ${hours}時 ${minutes}分`;
  };

  const changeReadStatus = (NotifiId) => {
    try {
      db.collection("user")
        .doc(userId)
        .collection("notification")
        .doc(NotifiId)
        .update({
          read: true,
        });
    } catch (error) {
      console.error("Error updating read status:", error);
    }
  };

  return (
    <div className="notificationBox">
      <p className="notificationBoxTitle">お知らせ</p>
      <div className="notificationItems">
        {notifications.map((el) => (
          <div
            className={`notificationItem ${el.read ? "" : "unread"}`}
            key={el.id}
            onClick={() => el.read || changeReadStatus(el.id)}
          >
            <div className={`${el.read ? "greyPoint" : "bluePoint"}`}></div>
            <div className="notificationItemContentBox">
              <p className="notificationItemContent">{el.message}</p>
              <p className="notificationItemTime">
                {getJapaneseDay(el.createdAt.seconds)}
              </p>
            </div>
            {el.circleId && (
              <Link to={`/${el.circleId}/${el.circleName}/circle_home`}>
                <Button>見る</Button>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
