import React from 'react'
import './voteButton.css'

class VoteButton extends React.Component {

    state = {
        valueshere: null
    }

    componentDidMount(){
        console.log("voteButton Component(s) loaded!");
    }
    // future methods here

    render(){
        return(
            <div>
                <div id="vote-Button"></div>
            </div>
        )
    }
}

export default VoteButton;