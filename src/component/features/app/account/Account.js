import React from 'react'
import { Link } from 'react-router-dom'

export default function Account() {
  return (
    <>
      <div>Account</div>
      {<Link to="/circle-register">サークル申し込み</Link>}
    </>

  )
}
