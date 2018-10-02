import React from 'react'
import './userSeat.css'

class UserSeat extends React.Component {

    state = {
        valueshere: null
    }

    componentDidMount() {
        console.log("UserSeat Component loaded!");
    }

    // future methods here



    render() {
        return (
            <div id="user-seat">
                <div id="user-section">
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


                </div>
            </div>

        )
    }
}

export default UserSeat;