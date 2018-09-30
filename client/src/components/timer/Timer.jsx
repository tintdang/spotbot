import React from 'react'
import './timer.css'

class Timer extends React.Component {

    state = {
        valueshere: null
    }

    componentDidMount(){
        console.log("Timer Component loaded!");
    }
    // future methods here

    render(){
        return(
            <div>
                <span id="timer">30:0</span>
            </div>
        )
    }
}

export default Timer;