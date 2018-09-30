import React from 'react'
import './userSeat.css'

class UserSeat extends React.Component {

    state = {
        valueshere: null
    }

    componentDidMount(){
        console.log("UserSeat Component loaded!");
    }

    // future methods here



    render(){
        return(
            <div id="user-seat">
            <div id="user-section">
                <div id="user-input">

                </div>
                <div id="user-info">

                </div>
                </div>
            </div>
        )
    }
}

export default UserSeat;