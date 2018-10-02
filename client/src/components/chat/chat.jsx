import React from "react";
import io from "socket.io-client";
import './chat.css';

const origin = window.location.origin;
class Chat extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            author: '',
            message: '',
            messages: []
        };

        this.socket = io(origin);

        this.socket.on('RECEIVE_MESSAGE', function (data) {
            console.log("Received msg?", data);
            addMessage(data);
        });
        // from bot <--
        this.socket.on('bot reply', function(msg){
            console.log("Received bot msg?", msg);
            addMessage(msg);
          });

        const addMessage = data => {
            console.log("Data rec'd in addMsg method:", data);
            this.setState({ messages: [...this.state.messages, data] });
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.author,
                message: this.state.message
            });
            // to bot -->
            this.socket.emit('chat message', {
                message: this.state.message
            });
            // clear state
            this.setState({ message: '' });
        }
    }

    componentDidMount() {
        console.log("Chat mounted");
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    genNewKey = () => {
        let randNum = Math.floor(Math.random() * 300);
        let key = Date.now() + randNum;
        console.log("Key id assigned: ", key);
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
                                    onChange={this.genNewKey}
                                    key={this.key}>
                                    {message.author}: {message.message}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="card-footer">
                    <form>
                        <input type="text" placeholder="Username" name="author" className="form-control"
                            value={this.state.author}
                            onChange={this.handleInputChange}
                        />
                        <br />
                        <input type="text" placeholder="Message" name="message" className="form-control"
                            onChange={this.handleInputChange}
                            value={this.state.message} />
                        <br />
                        <button onClick={this.sendMessage} className="btn btn-dark form-control">Send</button>
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