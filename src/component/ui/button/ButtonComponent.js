
import React from 'react'
import styled from 'styled-components'
import styles from "./Button.module.css"
export default function ButtonComponent({ ...props }) {

  const ButtonComponent = styled.div`
  background-color: ${props => props.mode === "cancel" ? "#686465" : "rgb(206, 71, 107);"};
  color: #FFFFFF;
`
  return (
    <>
      <ButtonComponent className={styles.button} mode={props.mode} onClick={props.onClick}>{props.children}</ButtonComponent>
    </>
  )
}
