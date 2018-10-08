import React from 'react';
import '../../assets/style.css';

const Timer = props =>

    <div>
        <span id="timer"><p className="material-icons">schedule</p> {props.time}</span>
    </div>

export default Timer;