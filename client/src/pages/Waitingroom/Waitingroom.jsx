import React from 'react';
import '../../assets/style.css';
import Navbar from "../../components/Navbar";

class Waitingroom extends React.Component {
    state = {
        currentlyPlaying: 0
    }

    render() {
        return (
            <div>
                <Navbar />
                <h1> Welcome to the Waitingroom </h1>
                <h2>There are currently {this.state.currentlyPlaying} players playing</h2>

            </div>
        )
    }
}

export default Waitingroom;

//This function is responsible for triggering the handleAuthentication process. When it ends, it routes the user to the '/game' page.