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
                <img
                href="https://www.placehold.it/200x200"></img>
            </div>
        )
    }
}

export default UserSeat;