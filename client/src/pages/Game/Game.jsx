import React from "react";
import './game.css';
import UserSeat from '../../components/userSeat';
import Navbar from "../../components/Navbar";
import PopOutRight from '../../components/popOutRight';
import PopOutLeft from '../../components/popOutLeft';
import './gameBoard.css';
import './chat.css';
import io from "socket.io-client";


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
            score: null
        };

        // USE THESE TO TOGGLE FOR PRODUCTION OR IMPLEMENT A SWITCH
        //this.socket = io(origin, {'sync disconnect on unload': true });
        this.socket = io('localhost:3001', { 'sync disconnect on unload': true });
        // END PROD-SWITCH

        // receive chat messages from socket 
        this.socket.on('RECEIVE_MESSAGE', (data) => {
            //console.log("Received msg?", data);
            addMessage(data);
        });

        // receive game messages from socket
        this.socket.on('GAME_MESSAGE', (data) => {
            addMessage(data);
        });

        // from bot <--
        this.socket.on('bot reply', (msg) => {
            //console.log("Received bot msg?", msg);
            this.setState({
                // botname: msg.author,
                botMsg: msg
            });

            this.socket.emit('SEND_MESSAGE', {
                author: this.state.botname,
                message: this.state.botMsg
            });
        });

        // game time logic
        this.socket.on('game_logic', (data) => {
            this.setState(data);
        });

        // This sets username 
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

        const addMessage = data => {
            //console.log("Data rec'd in addMsg method:", data);
            this.setState({ messages: [...this.state.messages, data] });
            //console.log(this.state.messages);
            this.autoscrollDown()
        };

        // too bot -->
        this.sendToBot = () => {
            // event.preventDefault();
            this.socket.emit('chat message', {
                message: this.state.message
            });
        }

        this.sendMessage = () => {
            // event.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.author,
                message: this.state.message
            });
            // clear state
            this.setState({ message: '' });
            //console.log("sendMessage Ran. Message state reset to blank: ", this.state.message);
        }
    }

    actionsOnClick = event => {
        event.preventDefault();
        //console.log('ACTIONS CALLED.');
        if (this.state.chatActive === true) {
            this.sendMessage();
            this.sendToBot();
        }
    };

    componentDidMount() {
        console.log("Game Canvas (and chat) Component loaded!");
    }

    autoscrollDown = () => {
        const element = document.getElementById("card-body");
        element.scrollTop = element.scrollHeight - element.clientHeight;
    }

    //It's a terrible way to swap it, but here's where chatActive turns on and off.
    handleInputChange = event => {
        if (this.state.chatActive === true) {
            const { name, value } = event.target;
            this.setState({ [name]: value });
        } else {
            console.log("Chat is NOT working because it's flagged to be off in our state");
        }
    }

    genNewKey = () => {
        randNum = Math.floor(Math.random() * 300);
        key = Date.now() + randNum;
        console.log("Key id assigned: ", key);
        // return key;
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

    render() {
        return (
            <div id="canvas">
                <Navbar />
                <PopOutLeft />
                <div id="game-board">
                    <div className="card">
                        <div id="card-body" className="card-body">
                            <div className="scrolltobottom">

                                <div className="card-title">Welcome to SpotBot. Try to convince the other players that you're the bot, then try to guess who is actually fake! A round will begin when all players are here. For more information on game details, including scoring: Go here!</div>
                                <hr />

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
                        </div>
                        <div className="card-footer">
                            <form>
                                {/* <input type="text" placeholder="Username" name="author" className="form-control"
                            value={this.state.author}
                            onChange={this.handleInputChange}
                        /> */}
                                <br />
                                <input type="text" placeholder="Message" name="message" className="form-control"
                                    onChange={this.handleInputChange}
                                    value={this.state.message}
                                />
                                <br />
                                <button onClick={this.actionsOnClick} className="btn btn-dark form-control">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
                <PopOutRight />
                <UserSeat time={this.state.timer} />
                <button id='logout-button' onClick={this.logout}>Logout</button>
            </div>
        )
    }
}

export default Game;