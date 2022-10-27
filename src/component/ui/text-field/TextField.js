import { TextFields } from '@mui/icons-material'
import React from 'react'
import styles from "./TextField.module.css"

export default function TextField({ ...props }) {
  return (
    <>
      <span className={styles.input__label}>{props.children}</span>
      <TextFields />
    </>

  )
}
