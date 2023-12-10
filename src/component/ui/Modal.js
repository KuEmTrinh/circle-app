import React from "react";
import "./Modal.css";
import CloseIcon from "@mui/icons-material/Close";
export default function Modal(props) {
  return (
    <>
      {props.show ? (
        <div className="overlayModal">
          <div className={"modal " + props.className}>
            {props.showClose !== false ? (
              <div
                className="closeIcon"
                onClick={() => {
                  props.onClose();
                }}
              >
                <CloseIcon />
              </div>
            ) : (
              ""
            )}
            <div className="modalContent">{props.children}</div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
