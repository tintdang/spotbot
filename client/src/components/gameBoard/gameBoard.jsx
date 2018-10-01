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
        //This will run the stop countdown function below and will stop the timer to continue any furthur
        return this.stopCountdown()
      }

    }, 1000)
  }

  stopCountdown = () => {
    clearInterval(interval)
    //Reset the timer back to the normal state
    this.setState({
      timer: 5
    })
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