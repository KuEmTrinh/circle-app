import React from 'react'
import { useEffect, useState } from 'react';
import TitleText from '../../../../ui/TitleText';
import { FormControl } from 'react-bootstrap';
import { InputLabel, TextField } from '@mui/material';
import "./CreateEvent.css"

export default function CreateEvent(props) {
    const [createNewEventInfor, setCreateNewEventInfor] = useState({

        name: "",
        time:"",
        place:"",
        money:"",
        maxMembers:"",
        content:"",


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
        <div className='createNewEvent'>
            <TitleText>イベント追加</TitleText>
            <div className="creatNewEventInputBox">
                <TextField
                    className="createNewEventTextField"
                    label="イベント名"
                    inputProps={{ maxLength: 25 }}
                    name="name"
                    onChange={handleChange}
                  
                ></TextField>
                 <TextField
                    className="createNewEventTextField"
                    label="時間"
                    inputProps={{ maxLength: 25 }}
                    name="time"
                    onChange={handleChange}
                ></TextField>
                 <TextField
                    className="createNewEventTextField"
                    label="場所"
                    inputProps={{ maxLength: 25 }}
                    name="place"
                    onChange={handleChange}
                ></TextField>
                 <TextField
                    className="createNewEventTextField"
                    label="料金"
                    inputProps={{ maxLength: 25 }}
                    name="money"
                    onChange={handleChange}
                ></TextField>
                 <TextField
                    className="createNewEventTextField"
                    label="最大人数"
                    inputProps={{ maxLength: 25 }}
                    name="maxMembers"
                    onChange={handleChange}
                ></TextField>
                 <TextField
                    className="createNewEventTextField"
                    label="イベント内容"
                    inputProps={{ maxLength: 25 }}
                    name="content"
                    onChange={handleChange}
                ></TextField>
               
            
            </div>

        </div>

    )
}
