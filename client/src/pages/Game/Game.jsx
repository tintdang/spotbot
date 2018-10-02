import React from "react";
import './game.css';
import GameBoard from '../../components/gameBoard';
import UserSeat from '../../components/userSeat';

const Game = props => {
  //Creating a logout button
  const logout = () => {
    props.auth.logout();
    props.history.push('/');
  };


  return (
    <div>
      <GameBoard />
      <UserSeat />
      <button style={{float:"right"}} onClick={logout}>Logout</button>
    </div>
  )

}

export default Game;