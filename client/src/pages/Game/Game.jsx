import React from "react";
import './game.css';
import GameBoard from '../../components/gameBoard';
import UserSeat from '../../components/userSeat';
import Navbar from "../../components/Navbar";
import PopOutRight from '../../components/popOutRight';
import PopOutLeft from '../../components/popOutLeft';


let interval;

class Game extends React.Component {
  
  state = {
    timer: 5
  }

  componentDidMount() {
    console.log("Game Canvas Component loaded!");
  }

  timerCountdown = () => {
    interval = setInterval(() => {
      this.setState({
        timer: this.state.timer - 1
      })
      console.log(this.state.timer)

      if (this.state.timer === 0) {
        console.log("this should stop")
        //This will run the stop countdown function below and will stop the timer to continue any furthur
        return this.stopCountdown()
      }

    }, 1000)
  }

  stopCountdown = () => {
    clearInterval(interval)
    //Reset the timer back to the normal state after 3 seconds
    setTimeout(() => {
      this.setState({
        timer: 5
      })
    }, 3000)
  }
  
  //Creating a logout button
  logout = () => {
    this.props.auth.logout();
    this.props.history.push('/');
  };

render(){
  return (
    <div id="canvas">
      <Navbar />
      <PopOutLeft />
      <GameBoard />
      <PopOutRight />
      <UserSeat time={this.state.timer} />
      <button id='logout-button' onClick={this.logout}>Logout</button>
    </div>
  )
  }
}

export default Game;