import React from 'react'
import ButtonComponent from '../../../../ui/button/ButtonComponent'
import TextField from '../../../../ui/text-field/TextField'
import styles from "./CircleRegister.module.css"
export default function CircleRegister() {
    const cancelFunction = () => {
        console.log("cancel")
    }
    const sendFunction = () => { }
    return (
        <>
           <h1 className='title__text'>サークル新規</h1>
            <div>
                <TextField></TextField>
            </div>
            <div className={styles.button__area}>
                <ButtonComponent mode="cancel" onClick={() => cancelFunction()}>取り消し</ButtonComponent>
                <ButtonComponent mode="send" onClick={() => sendFunction()}>申請</ButtonComponent>
            </div>


        </>


    )
}
