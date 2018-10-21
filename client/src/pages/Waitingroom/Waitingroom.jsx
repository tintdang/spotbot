import React from 'react';
import '../../assets/style.css';
import Navbar from "../../components/Navbar";

class WaitingRoom extends React.Component {
    state = {
        currentlyPlaying: 0
    }

    playAgain = () => {
        this.props.history.push('/game')
    }
    logout = () => {
        this.props.auth.logout();
        this.props.history.push('/');
    }
    render() {
        return (
            <div className="container-fluid land-bkgd">
                <Navbar />
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card" id="wait-card">
                            <h2 className="text-center wr" id="wait-card-title"> The Waiting Room: </h2>
                            {/* <hr id="wait-hr" /> */}
                            <h3 className="text-center wr">Hope you enjoyed that round!</h3>
                            <br />
                            <h4 className="text-center wr"><img alt="#" className="smallImg fl" id="wait-bot" src="/assets/images/noun_Chatbot_933467.png" />Pull up a chair and relax, or jump into a game!<br /><br /> Tired of sitting out while others play? Multiple game rooms: in an ice box near you! </h4><br />
                            {/* <h2>This is currently in p</h2> This will be for future development to check how many people are in the room*/}
                            <div className="row justify-content-center">
                                <button className="btn btn-dark" id="wait-btn-pad1" onClick={this.playAgain}> Play Again </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <button className="btn btn-dark" id="wait-btn-pad2" onClick={this.logout}> Logout </button>
                </div>
            </div>
        )
    }
}

export default WaitingRoom;

//This function is responsible for triggering the handleAuthentication process. When it ends, it routes the user to the '/game' page.