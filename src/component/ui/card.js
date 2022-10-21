import React from "react";
import styled from "styled-components";

export default function card(props) {
  const Card = styled.div`
    width: ${props.width};
    height: ${props.height};
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgb(206, 71, 107);
    border-radius: 0 0 10px 10px;
    border: 1px solid rgba(209, 213, 219, 0.3);
    box-sizing: border-box;
  `;
  return <Card>{props.children}</Card>;
}
