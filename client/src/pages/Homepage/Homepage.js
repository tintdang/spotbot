import React from "react";
import Navbar from '../../components/Navbar';
import '../../assets/style.css';


class Homepage extends React.Component {

  render() {
    return (
      <div className="land-bkgd">
        <Navbar />
        <div className="card" id="game-board">
          <div id="welcome-flow" className="carousel slide carousel-fade" data-ride="carousel" data-interval="false">
            <div className="carousel-inner" id="scroll">
              <div className="carousel-item active">
                <div className="wflow fl welcome" id="welcome1">

                  <p className="fl welcome">
                    <img alt="#" className="smallImg fl" id="bot1" src="/assets/images/noun_Chatbot_933467.png" />
                    Hello, human!  My name is Spot, and I'm a sneaky Chat-bot with a fun challenge for you... Finding me!</p>
                  <br /><br />I've got some of your fleshy friends on their way to help me try to trick you!<br /><br />
                  <p className="fl welcome bonus"> I hope you're ready for a challenge!</p>
                </div>
                {/* <img className="d-block w-100" src='#' alt="Welcome" /> */}
              </div>

              <div className="carousel-item">
                <div className="wflow fl" id="welcome2">
                  <p className="welcome fl">Your job is easy: Try your best to act like YOU are a chat bot! If you do a good job, you'll trick those other meatbags!<br /><br /> But pay close attention... <img alt="#" className="smallImg fl" src="/assets/images/noun_Chatbot_933467.png" />you also have to try and SPOT the BOT!<span className="fl welcome bonus">You'll earn a point for finding me!</span></p>
                </div>
                {/* <img className="d-block w-100" src='#' alt="Game Instructions" /> */}
              </div>

              <div className="carousel-item">
                <div className="wflow fl" id="welcome3">
                  <p className="welcome fl">The game will not begin until there are three players, so please wait for some friends.<br /><br /><img alt="#" className="smallImg fr" src="/assets/images/noun_Chatbot_933467_r.png" />After we all converse, you get to guess who I am! To win, make  your friends think that you're the bot!<span className="fl welcome bonus"><br />But don't be tricked yourself...</span></p>
                </div>
                {/* <img className="d-block w-100" src='#' alt="How it works" /> */}
              </div>

              <a className="carousel-control-prev" href="#welcome-flow" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#welcome-flow" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>

            </div>
          </div>
          <button className="btn btn-dark" id="enter-btn" onClick={this.props.auth.login}>LOG IN TO PLAY!</button>
        </div>
      </div>
    )
  }
};

export default Homepage;