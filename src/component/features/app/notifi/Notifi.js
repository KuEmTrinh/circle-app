import React, { useState, useEffect } from "react";
import { db } from "../../../../app/firebase";
import { useSelector } from "react-redux";
import "./Notifi.css";
export default function Notifi() {
  const userId = useSelector((state) => state.login.data.uid);
  const [notifications, setNotifications] = useState();
  useEffect(() => {
    fetchNotifi();
  }, []);
  const fetchNotifi = async () => {
    const query = db
      .collection("user")
      .doc(userId)
      .collection("notification")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.docs.map((doc) => {
          let item = doc.data();
          item.id = doc.id;
          data.push(item);
        });

        console.log(data);

        setNotifications(data);
      });
    return query;
  };
  const getJapaneseDay = (secs) => {
    var seconds = secs; // Example seconds data
    var date = new Date(seconds * 1000);

    var months = [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ];

    var month = months[date.getMonth()];
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();

    var dateString = month + " " + day + "日 " + hours + "時 " + minutes + "分";

    return dateString; // Output: "9月 25日 16時 19分"
  };

  const changeReadStatus = (NotifiId) => {
    const query = db
      .collection("user")
      .doc(userId)
      .collection("notification")
      .doc(NotifiId)
      .update({
        read: true,
      });
    return query;
  };
  return (
    <div className="notificationBox">
      <p className="notificationBoxTitle">お知らせ</p>
      <div className="notificationItems">
        {notifications?.map((el) => {
          return (
            <>
              {el.read ? (
                <div className="notificationItem" key={el.id}>
                  <div className="greyPoint"></div>
                  <div className="notificationItemContentBox">
                    <p className="notificationItemContent">{el.message}</p>
                    <p className="notificationItemTime">
                      {getJapaneseDay(el.createdAt.seconds)}
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  className="notificationItem"
                  onClick={() => {
                    changeReadStatus(el.id);
                  }}
                  key={el.id}
                >
                  <div className="bluePoint"></div>
                  <div className="notificationItemContentBox">
                    <p className="notificationItemContent">{el.message}</p>
                    <p className="notificationItemTime">
                      {getJapaneseDay(el.createdAt.seconds)}
                    </p>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}
