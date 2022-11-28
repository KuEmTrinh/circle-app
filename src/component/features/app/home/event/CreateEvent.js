import React from 'react'
import { useEffect, useState } from 'react';
import TitleText from '../../../../ui/TitleText';
import { FormControl } from 'react-bootstrap';
import { InputLabel, TextField } from '@mui/material';
import ButtonComponent from '../../../../ui/ButtonComponent';

export default function CreateEvent(props) {
    const [createNewEventInfor, setCreateNewEventInfor] = useState({

        name: "",

    });
    const handleChange = (e) => {
       setCreateNewEventInfor({
        ...createNewEventInfor,
        [e.target.name]:e.target.value
       });
       sendNewEventInfor();

        
    }
    const sendNewEventInfor=()=>{
        props.parentCallback(createNewEventInfor);
    }
    return (
        <>
            <TitleText>イベント追加</TitleText>
            <div className="creatNewEventInputBox">
                <TextField
                    className="createNewEventTextField"
                    label="イベント名"
                    inputProps={{ maxLength: 25 }}
                    name="name"
                    onChange={handleChange}
                ></TextField>
                <div>{ createNewEventInfor.name }</div>
            
            </div>

        </>

    )
}
