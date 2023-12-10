import React from "react";
import Dialog from "@mui/material/Dialog";
import Title from "./Title";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import "./Component.css";

export default function CircleModal(props) {
  return (
    <>
      <Dialog
        open={props.show ? props.show : false}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <div className={props.mobile ? "mDialogBody" : "dialogBody"}>
          <div className="headerWithIcon">
            <Title>{props.title ? props.title : "Dialog"}</Title>
            <CloseIcon
              onClick={() => {
                props.onClose();
              }}
              fontSize="medium"
            />
          </div>
          <div className="dialogContent">{props.children}</div>
          <div className="dialogFooter">
            <Button
              variant="outline"
              fullWidth
              onClick={() => {
                props.onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={async () => {
                try {
                  await props.confirm();
                  props.onClose();
                } catch (error) {
                  props.onClose();
                }
              }}
              disabled={props.btnDisable}
            >
              {props.btnName ? props.btnName : "Confirm"}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
