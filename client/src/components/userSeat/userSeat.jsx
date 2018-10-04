import React from 'react'
import './userSeat.css'
import VoteButton from '../voteButtons';
import Timer from '../timer';

const UserSeat = props => {

        return (
            <div id="user-seat">
                <VoteButton>1</VoteButton>
                <VoteButton>2</VoteButton>
                <VoteButton>3</VoteButton>
                <Timer time={props.time}/>

                {/* <div id="user-section">
                    <div id="user-info">
                        <span>Welcome to SpotBot, 'Username'!</span><span>You've won # games.</span>
                    </div>
                    <div id="user-input">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Convince us you're a bot:</span>
                            </div>
                            <input type="text" className="form-control" placeholder="Speak to us..." aria-label="user-input" aria-describedby="basic-addon1"></input>
                        </div>
                    </div>
                </div> */}
            </div>
        )
}

export default UserSeat;