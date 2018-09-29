import React from 'react'
import './gameBoard.css'

class GameBoard extends React.Component {

    state = {
        valueshere: null
    }

    componentDidMount(){
        console.log("GameBoard Component loaded!");
    }
    // future methods here

    render(){
        return(
            <div id="game-board">
                <textarea   id="game-text"
                            defaultValue="User interaction will go here...">
                </textarea>
            </div>
        )
    }
}

export default GameBoard;