import React, { Component } from "react";
import './game.css';
import GameBoard from '../../components/gameBoard';
import UserSeat from '../../components/userSeat';

class Game extends Component {

  render() {
    return(
      <div>
        <GameBoard />
        <UserSeat />
      </div>
    )
  }
}

export default Game;