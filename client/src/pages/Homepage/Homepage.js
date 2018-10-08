import React from "react";
import Navbar from '../../components/Navbar';
import '../../assets/style.css';
import ScaleText from 'react-scale-text';

class Homepage extends React.Component {

  componentDidUpdate() {
  }

  render() {
    return (
      <div className="canvas">
        <Navbar />
        <div className="card" id="game-board">
          <div id="welcome-flow" className="carousel slide carousel-fade" data-ride="carousel" onChange={this.componentDidUpdate}>
            <div className="carousel-inner" id="scroll">

              <div className="carousel-item active">
                <div className="wflow" id="welcome">
                  <div>
                    <img className="smallImg fl" src="/assets/images/chat-bot.jpg" />
                    <ScaleText minFontSize={6} maxFontSize={24}>
                    <p className="fl">Hello, human!  My name is Spot, and I'm a sneaky Chat-bot with a fun challenge for you!<img className="smallImg fr" src="/assets/images/chat-bot.jpg" /></p>
                    </ScaleText>
                  </div>
                </div>
                {/* <img className="d-block w-100" src='#' alt="Welcome" /> */}
              </div>

              <div className="carousel-item">
                <div className="wflow" id="instructions"> Here's how the game works: </div>
                {/* <img className="d-block w-100" src='#' alt="Game Instructions" /> */}
              </div>

              <div className="carousel-item">
                <div className="wflow" id="rules"> Here's more things you need to know!</div>
                {/* <img className="d-block w-100" src='#' alt="How it works" /> */}
              </div>

            </div>
          </div>
          <button className="btn btn-dark" id="enter-btn" onClick={this.props.auth.login}>Login to Play!</button>
        </div>
      </div>
    )
  }
};

export default Homepage;