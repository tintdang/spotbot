import React from "react";
import '../../assets/style.css';
import UserSeat from '../../components/userSeat';
import Navbar from "../../components/Navbar";
import PopOutRight from '../../components/popOutRight';
import PopOutLeft from '../../components/popOutLeft';
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
            score: null,
            allowVoting: false,
            userNames: [],
            votedFor: ''
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
        this.socket.on('BOT_REPLY', (msg) => {
            //console.log("Received bot msg?", msg);
            this.setState({
                botMsg: msg
            });
            //if (this.state.chatActive) {
                this.socket.emit('SEND_MESSAGE', {
                    author: this.state.botname,
                    message: this.state.botMsg
                });
            //}
        });

        // game time logic
        this.socket.on('GAME_LOGIC', (data) => {
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

        // receive endgame from socket
        this.socket.on('END_GAME', (data) => {
            console.log(data)
            console.log("This user is called " + this.state.author)
            console.log("The index of " + this.state.author + " is " + data.userNames.indexOf(this.state.author))
            //This will return the object with the removed username that is used by the current client
            data.userNames.splice((data.userNames.indexOf(this.state.author)), 1);
            // let newData = data.userNames.splice(data.userNames.indexOf(this.state.author), 1);
            // console.log(newData);
            this.setState(data);

            //console.log(this.state.userNames)
            // Run a function that will print out the names of the opposing users in the game in buttons

        });

        // this will end the game 
        this.socket.on('FINAL', (data) => {
            this.results();
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
            this.socket.emit('BOT_MESSAGE', {
                message: this.state.message
            });
        }

        // send global socket message
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

    // final function
    results = () => {
        // This will check if they win
        console.log(this.state.votedFor)
        console.log(this.state.botname)
        if (this.state.votedFor === this.state.botname) {
            this.setState({
                messages: [...this.state.messages,
                { author: "SpotBot", message: `You are correct. The bot was ${this.state.botname}` }]
            });
            this.autoscrollDown()
        } else {
            this.setState({
                messages: [...this.state.messages,
                { author: "SpotBot", message: `You are incorrect. The bot was ${this.state.botname}` }]
            });
            this.autoscrollDown()
        }
        setTimeout(() => {
            // KICK PEOPLE to a broken page
            this.props.history.push('/waitingroom')
        }, 5000);
    }

    // event listener for vote buttons
    vote = value => {
        // event.preventDefault();
        if (this.state.allowVoting) {
            console.log(`I voted for ${value}`);
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
        this.chatDelay();
    };

    // timeout messages function
    chatDelay = () => {
        let delayCount = 5;
        this.state.chatActive = false;
        console.log("5 second chat delay started");
        /*
        setInterval(() => {
            this.setState({
                messages: [...this.state.messages,
                { author: "SpotBot", message: delayCount }]
            });
            delayCount--;
        }, 1000); 
        */
        setTimeout(() => { this.state.chatActive = true }, 3000);
    }

    componentDidMount() {
        console.log("Game Canvas (and chat) Component loaded!");
    }

    autoscrollDown = () => {
        const element = document.getElementById("scroll");
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
            <div className="canvas">
                <Navbar />
                <PopOutLeft />
                <div className="card" id="game-board">

                    <div className="card-title">Welcome to SpotBot. This is now shorter. Write something good.
                                <hr />
                    </div>

                    <div className="card-body" id="scroll">
                        <div  className="messages">
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