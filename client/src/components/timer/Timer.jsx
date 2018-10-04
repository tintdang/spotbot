import React from 'react'
import './timer.css'

const Timer = props =>

    <div>
        <span id="timer">Time: {props.time}</span>
    </div>;


export default Timer;