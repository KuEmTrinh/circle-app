import React from "react";
import "./Modal.css";
import CloseIcon from "@mui/icons-material/Close";
export default function Modal(props) {
  return (
    <>
      {props.show ? (
        <div className={"modal "+props.className}>
          <div className="modalContent">{props.children}</div>
          {props.closeIcon==="none"?<></>:
          <div
          className="closeIcon"
          onClick={() => {
            props.onClose();
          }}
        >
         <CloseIcon></CloseIcon>
        </div>
          }
          {/* <div
            className="closeIcon"
            onClick={() => {
              props.onClose();
            }}
          >
           <CloseIcon></CloseIcon>
          </div> */}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
