import React from 'react';
import '../../assets/style.css';

const toggleVisibility = () => {}

const PopOutRight = props =>

    <div className="popOut right">
        <div>
            <button id="prbutton" onClick={toggleVisibility()}> =- </button>
        </div>
    </div>

export default PopOutRight;