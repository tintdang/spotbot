import React from 'react';
import '../../assets/style.css';

const toggleVisibility = () => {}

const PopOutLeft = props =>

    <div className="popOut left">
        <div>
            <button id="plbutton" onClick={toggleVisibility()}> -= </button>
        </div>
    </div>

export default PopOutLeft;