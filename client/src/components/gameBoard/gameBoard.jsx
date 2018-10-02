import React from 'react';
import './gameBoard.css';
import Timer from '../timer';
import Chat from '../chat';



class GameBoard extends React.Component {

    state = {
        timer: null,

    }

    componentDidMount() {
        console.log("GameBoard Component loaded!");
    }
    // future methods here

    render(){
        return (
            <div id="game-board">
            <Chat />
                {/* <textarea id="game-text"
                    defaultValue="User interaction will go here...">
                </textarea> */}
                {/* <div id="timer-holder">
                    <Timer />
                </div> */}
            </div>

        )
    }
};

export default GameBoard;