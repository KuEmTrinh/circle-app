import React from "react";
import styled from "styled-components";

export default function TitleText({ ...props }) {
  const TitleText = styled.div`
    color: #c13450;
    font-size:18px;
    font-weight:600;
    margin-bottom:10px;
  `;

  return (
    <div>
      <TitleText className={props.className}>
        <p>{props.children}</p>
      </TitleText>
    </div>
  );
}
