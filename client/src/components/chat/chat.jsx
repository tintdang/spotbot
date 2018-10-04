import React from "react";
import io from "socket.io-client";
import './chat.css';
import API from "../../utils/API";

const origin = window.location.origin;

let randNum;
let key;

class Chat extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            author: '',
            message: '',
            messages: [],
            botMsg: 'test123',
            botname: 'Real_Human_Person.exe'
        };

        // USE THESE TO TOGGLE FOR PRODUCTION OR IMPLEMENT A SWITCH
        // this.socket = io(origin);
        console.log("Ignore this but leave it:", origin);

        this.socket = io('localhost:3001', 
        {'sync disconnect on unload': true });
        

        // this.socket = io('localhost:3001');
        // END PROD-SWITCH

        this.socket.on('RECEIVE_MESSAGE', (data) => {
            console.log("Received msg?", data);
            addMessage(data);
            // store to database
            API.saveHistory(data);
        });

        // from bot <--
        this.socket.on('bot reply', (msg) => {
            console.log("Received bot msg?", msg);
            this.setState({
                // botname: msg.author,
                botMsg: msg
            });

            this.socket.emit('SEND_MESSAGE', {
                author: this.state.botname,
                message: this.state.botMsg
            });
            addMessage(msg);
        });

        const addMessage = data => {
            console.log("Data rec'd in addMsg method:", data);
            this.setState({ messages: [...this.state.messages, data] });
            console.log(this.state.messages);
        };

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
            console.log("sendMessage Ran. Message state reset to blank: ", this.state.message);
        }
    }

    actionsOnClick = event => {
        event.preventDefault();
        console.log('ACTIONS CALLED.');
        this.sendMessage();
        this.sendToBot();
    };

    componentDidMount() {
        console.log("Chat mounted");
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    genNewKey = () => {
        randNum = Math.floor(Math.random() * 300);
        key = Date.now() + randNum;
        console.log("Key id assigned: ", key);
        // return key;
    }

    render() {
        return (
            // BOOTSTRAP FORMATTING TURNED OFF FOR NOW
            // <div className="container">
            //     <div className="row">
            //         <div className="col-4">
            <div className="card">
                <div className="card-body">
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
            //         </div>
            //     </div>
            // </div>
        );
    }
}

export default Chat;