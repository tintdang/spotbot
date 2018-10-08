import React from 'react';
import '../../assets/style.css';
import VoteButton from '../voteButtons';
import Timer from '../timer';

const UserSeat = props => {

    return (
        <div id="user-seat">
            <Timer time={props.time} />
            {props.vote.map(button => {
                return (
                    <VoteButton key={button} onClick={() => props.buttoncheck(button)} >{button}</VoteButton>
                )
            })}
        </div>
    )
}

export default UserSeat;