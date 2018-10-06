import React from 'react'
import './voteButton.css'

const VoteButton = ({ children }) => {

    // componentDidMount(){
    //     console.log("voteButton Component(s) loaded!");
    // }
    // future methods here

        return(
            <div>
                <button id="vote-Button">{children}</button>
            </div>
        )
}

export default VoteButton;