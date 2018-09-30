import React from 'react';
import { withRouter } from 'react-router';

const Callback = props => {
    props.auth.handleAuthentication().then(() => {
        props.history.push('/game')
    });
    
    return (
        <div>Logging into the Game</div>
    );
}

export default withRouter(Callback);

//This function is responsible for triggering the handleAuthentication process. When it ends, it routes the user to the '/game' page.