import React from 'react';
import './gameBoard.css';
import Chat from '../chat';


class GameBoard extends React.Component {


  render() {
    return (
      <div id="game-board">
        {/* <textarea id="game-text"
          defaultValue="User interaction will go here...">
        </textarea> */}
        <Chat />
      </div>
    )
  }
};

export default GameBoard;