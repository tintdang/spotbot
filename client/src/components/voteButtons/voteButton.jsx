import React from 'react';
import '../../assets/style.css';

const VoteButton = props => {

        return(
            <div>
                <button {...props} className="vote-button">{props.children}</button>
            </div>
        )
};

export default VoteButton;