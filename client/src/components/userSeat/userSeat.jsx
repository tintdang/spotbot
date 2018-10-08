import React from 'react';
import '../../assets/style.css';
import VoteButton from '../voteButtons';
import Timer from '../timer';

const UserSeat = props => {

        return (
            <div id="user-seat">
                <VoteButton>1</VoteButton>
                <VoteButton>2</VoteButton>
                <VoteButton>3</VoteButton>
                <Timer time={props.time}/>
            </div>
        )
}

export default UserSeat;