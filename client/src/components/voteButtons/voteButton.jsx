import React from 'react'
import './voteButton.css'

const VoteButton = props => {

    // componentDidMount(){
    //     console.log("voteButton Component(s) loaded!");
    // }
    // future methods here

        return(
            <div>
                <button {...props} className="vote-button" value={props.children}>{props.children}</button>
            </div>
        )
}

export default VoteButton;