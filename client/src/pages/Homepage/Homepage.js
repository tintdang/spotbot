import React from "react";
import Navbar from '../../components/Navbar';
import '../../assets/style.css';
// import ScaleText from 'react-scale-text';

// window.dispatchEvent(new Event('resize'));

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

              <div className="carousel-item active" onChange={this.componentDidUpdate}>

                <div className="wflow fl welcome" id="welcome1">

                    {/* <ScaleText minFontSize={6} maxFontSize={48}> */}
                      <p className="fl welcome">
                        <img className="smallImg fl" id="bot1" src="/assets/images/noun_Chatbot_933467.png" />
                        Hello, human!  My name is Spot, and I'm a sneaky Chat-bot with a fun challenge for you... Finding me!</p>
                        <br/><br/>I've got some of your fleshy friends on their way to help me try to trick you!<br/><br/>
                        <p className="fl welcome bonus"> I hope you're ready!</p>
                    {/* </ScaleText> */}
                  

                </div>

                {/* <img className="d-block w-100" src='#' alt="Welcome" /> */}
              </div>

              <div className="carousel-item">
                <div className="wflow fl" id="welcome2">
                  {/* <ScaleText minFontSize={6} maxFontSize={48}> */}
                    <p className="welcome fl">Your job is easy: Try your best to act like YOU are a chat bot! If you do a good job, you'll trick those other meatbags!<br/><br/> But pay attention...you also have to try and SPOT the BOT!<img className="smallImg fl" src="/assets/images/noun_Chatbot_933467.png" /></p>
                  {/* </ScaleText>  */}
                  </div>
                {/* <img className="d-block w-100" src='#' alt="Game Instructions" /> */}
              </div>

              <div className="carousel-item">
                <div className="wflow fl" id="welcome3">
                  {/* <ScaleText minFontSize={6} maxFontSize={48}> */}
                    <p className="welcome fl">The game will not begin until there are three players, so please wait for some friends.<br/><img className="smallImg fr" src="/assets/images/noun_Chatbot_933467.png" /><br/>After talking together, you'll get to guess who I am! To win, trick your friends that you're the bot...but don't be tricked yourself.</p>
                  {/* </ScaleText> */}
                </div>
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