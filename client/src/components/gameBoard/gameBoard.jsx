import React from 'react';
import './gameBoard.css';
import Timer from '../timer';

let interval;

class GameBoard extends React.Component {

  state = {
    timer: 5

  }

  componentDidMount() {
    console.log("GameBoard Component loaded!");
  }
  // future methods here

  timerCountdown = () => {
    interval = setInterval(() => {
      this.setState({
        timer: this.state.timer - 1
      })
      console.log(this.state.timer)

      if(this.state.timer === 0){
        console.log("this should stop")
        return this.stopCountdown()
      }

    }, 1000)
  }

  stopCountdown = () => {
    clearInterval(interval)
  }




  render() {
    return (
      <div id="game-board">
        <textarea id="game-text"
          defaultValue="User interaction will go here...">
        </textarea>
        <div id="timer-holder">
          <Timer time={this.state.timer} />
          <button onClick={() => this.timerCountdown()}>Start</button>
        </div>
      </div>
    )
  }
};

export default GameBoard;