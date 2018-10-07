import React from 'react'
import './voteButton.css'

const VoteButton = props => {

    // componentDidMount(){
    //     console.log("voteButton Component(s) loaded!");
    // }
    // future methods here

        return(
            <div>
                <button {...props} id="vote-Button">{props.children}</button>
            </div>
        )
}

export default VoteButton;