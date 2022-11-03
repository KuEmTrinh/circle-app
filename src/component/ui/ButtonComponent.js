import React from "react";
import styled from "styled-components";
export default function ButtonComponent({ ...props }) {
  const btnMedium = `
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;`;
  const btnLarge = `
  padding: 16px 28px;
  font-size: 20px;
  font-weight: bold;`;
  const btnSmall = `
  padding: 6px 20px;
  `;

  const setSizeButton = () => {
    if (props.size === "small") {
      return btnSmall;
    } else if (props.size === "large") {
      return btnLarge;
    } else {
      return btnMedium;
    }
  };

  const setBackgroundButton = () => {
    if (props.mode === "cancel") {
      return "background-color: #000; color: #ffffff;";
    } else {
      return "background-color: #C13450; color: #ffffff;";
    }
  };
  const ButtonComponent = styled.div`
    ${setSizeButton}
    ${setBackgroundButton}
    display: inline-block;
    border-radius: 30px;
    box-sizing: border-box;
    text-align: center;
  `;
  return (
    <>
      <ButtonComponent
        size={props.size}
        mode={props.mode}
        onClick={props.onClick}
      >
        <p>{props.children}</p>
      </ButtonComponent>
    </>
  );
}
