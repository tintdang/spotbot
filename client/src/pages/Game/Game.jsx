import React from "react";
import '../../assets/style.css';
import UserSeat from '../../components/userSeat';
import Navbar from "../../components/Navbar";
import PopOutRight from '../../components/popOutRight';
import PopOutLeft from '../../components/popOutLeft';
import io from "socket.io-client";
// import ScaleText from 'react-scale-text';


const origin = window.location.origin;

let randNum;
let key;
let interval;

class Game extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            author: '',
            message: '',
            messages: [],
            botMsg: 'test123',
            botname: '',
            timer: 15,
            chatActive: false,
            score: null,
            allowVoting: false,
            userNames: [],
            votedFor: '',
            gameRunning: false
        };

        // USE THESE TO TOGGLE FOR PRODUCTION OR IMPLEMENT A SWITCH
        //this.socket = io(origin, { 'sync disconnect on unload': true });
        this.socket = io('localhost:3001', { 'sync disconnect on unload': true });
        // END PROD-SWITCH

        // receive chat messages from socket 
        this.socket.on('RECEIVE_MESSAGE', (data) => {
            addMessage(data);
        });

        // receive game messages from socket
        this.socket.on('GAME_MESSAGE', (data) => {
            addMessage(data);
        });

        // from bot <--
        this.socket.on('BOT_REPLY', (msg) => {
            this.setState({
                botMsg: msg
            });
            if (!(this.state.allowVoting)) {
                this.socket.emit('SEND_MESSAGE', {
                    author: this.state.botname,
                    message: this.state.botMsg
                });
            }
        });

        // game time logic
        this.socket.on('GAME_LOGIC', (data) => {
            this.setState(data);
        });

        // This sets username for each client
        this.socket.on('USER_NAME', (data) => {
            if (this.state.author === '') {
                this.setState(data)
            }
        });

        // This sets bot name 
        this.socket.on('BOT_NAME', (data) => {
            this.setState(data)
        });

        // this will enable chat at game start
        this.socket.on('START_GAME', (data) => {
            this.setState(data);
        });

        //This will recieve the usernames and then set the state after
        this.socket.on("SEND_USER", (data) => {
<<<<<<< HEAD
=======
            // console.log(data)
            // console.log("This user is called " + this.state.author)
            // console.log("The index of " + this.state.author + " is " + data.userNames.indexOf(this.state.author))
>>>>>>> master
            //This will return the object with the removed username that is used by the current client
            data.userNames.splice((data.userNames.indexOf(this.state.author)), 1);
            //This will shuffle the usernames and post the opposing  for each client
            shuffle(data.userNames)
            this.setState(data)
        })

        // receive endgame from socket
        this.socket.on('END_GAME', (data) => {
            this.setState(data);
        });

        // this will end the game 
        this.socket.on('FINAL', (data) => {
            this.results();
        });

        const shuffle = (a) => {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }
        //This function will add onto the messages
        const addMessage = data => {
            this.setState({ messages: [...this.state.messages, data] });
            this.autoscrollDown()
        };

        // too bot -->
        this.sendToBot = () => {
            this.socket.emit('BOT_MESSAGE', {
                message: this.state.message
            });
        }

        // send global socket message
        this.sendMessage = () => {
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.author,
                message: this.state.message
            });
            // clear state
            this.setState({ message: '' });
        }
    }

    // final function
    results = () => {
        // This will check if they win
        if (this.state.votedFor === this.state.botname) {
            this.addMessage( { author: "SpotBot", message: `You are correct. The bot was ${this.state.botname}` } );
        } else {
            this.addMessage( { author: "SpotBot", message: `You are incorrect. The bot was ${this.state.botname}` } );
        }
        setTimeout(() => {
            //Kick them from socket
            this.socket.disconnect()
            // KICK everybody to the waiting room
            this.props.history.push('/waitingroom')
        }, 5000);
    }

    // event listener for vote buttons
    vote = value => {
        //Once user makes a vote, disable the vote function.
        if (this.state.allowVoting) {
            this.setState({
                votedFor: value,
                allowVoting: false
            });
        }
    }

    // send event for message
    actionsOnClick = event => {
        event.preventDefault();
        if (this.state.chatActive === true) {
            this.sendMessage();
            this.sendToBot();
        }
        if (this.state.gameRunning) {
            this.chatDelay();
        }
    };

    // timeout messages function
    chatDelay = () => {
        let delayCount = 5;
        this.state.chatActive = false;
<<<<<<< HEAD
        setTimeout(() => { this.state.chatActive = true }, 3000);
=======
        console.log("4 second chat delay started");
        setTimeout(() => { this.state.chatActive = true }, 4000);
>>>>>>> master
    }

    componentDidMount() {
        console.log("Game Canvas (and chat) Component loaded!");
    }

    autoscrollDown = () => {
        const element = document.getElementById("scroll");
        element.scrollTop = element.scrollHeight - element.clientHeight;
    }

    //This function enables users to be able to type but only when the game is active
    handleInputChange = event => {
        if (this.state.chatActive) {
            const { name, value } = event.target;
            this.setState({ [name]: value });
        }
    }

    genNewKey = () => {
        randNum = Math.floor(Math.random() * 300);
        key = Date.now() + randNum;
    }

    //Creating a logout button
    logout = () => {
        this.props.auth.logout();
        this.props.history.push('/');
    };

    // add-message global function
    addMessage = (data) => {
        //console.log("Data rec'd in addMsg method:", data);
        this.setState({ messages: [...this.state.messages, data] });
        //console.log(this.state.messages);
        this.autoscrollDown()
    };

    render() {
        return (
            <div className="canvas">
                <Navbar />
                <PopOutLeft />
                <div className="card" id="game-board">

                    <div className="card-title">
                    
                    Good luck finding Spot, our sneaky chat bot!<br />
                    <span className="subtext">(Chat turns on when the game begins...)</span>
                    
                    <hr />
                    </div>

                    <div className="card-body" id="scroll">
                        <div className="messages">
                            {this.state.messages.map(message => {
                                return (
                                    <div
                                        // onChange={this.genNewKey()}
                                        key={key}>
                                        {message.author}: {message.message}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="card-footer">
                        <form>
                            <input type="text" placeholder="Message" name="message" className="form-control"
                                onChange={this.handleInputChange}
                                value={this.state.message}
                            />
                            <button onClick={this.actionsOnClick} className="btn btn-dark form-control">Send</button>
                        </form>
                    </div>
                </div>

                <PopOutRight />
                <UserSeat time={this.state.timer} vote={this.state.userNames} buttoncheck={this.vote} />
                <div id="logout-button" onClick={this.logout}>
                    <span className="material-icons md-48">settings_backup_restore</span>
                </div>

            </div>
        )
    }
}

export default Game;