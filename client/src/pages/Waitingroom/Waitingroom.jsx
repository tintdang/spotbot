import React from 'react';
import '../../assets/style.css';
import Navbar from "../../components/Navbar";

class Waitingroom extends React.Component {
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
            <div className="canvas">
                <Navbar />
                <h1 className="text-center"> Welcome to the Waitingroom </h1>
                {/* <h2>This is currently in p</h2> This will be for future development to check how many people are in the room*/}
                <button className="btn btn-dark" onClick={this.playAgain} >Play Again</button>
                <button className="btn btn-dark" onClick={this.logout} >Logout</button>

            </div>
        )
    }
}

export default Waitingroom;

//This function is responsible for triggering the handleAuthentication process. When it ends, it routes the user to the '/game' page.