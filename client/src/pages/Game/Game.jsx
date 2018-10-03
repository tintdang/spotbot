import React from "react";
import './game.css';
import GameBoard from '../../components/gameBoard';
import UserSeat from '../../components/userSeat';
import Navbar from "../../components/Navbar";
import PopOutRight from '../../components/popOutRight';
import PopOutLeft from '../../components/popOutLeft';


const Game = props => {
  //Creating a logout button
  const logout = () => {
    props.auth.logout();
    props.history.push('/');
  };


  return (
    <div id="canvas">
      <Navbar />
      <PopOutLeft />
      <GameBoard />
      <PopOutRight />
      <UserSeat />
      <button id='logout-button' onClick={logout}>Logout</button>
    </div>
  )

}

export default Game;