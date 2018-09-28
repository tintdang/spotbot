import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Auth from './utils/Auth';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// creates the constructor for Auth
const auth = new Auth();

ReactDOM.render(
    <BrowserRouter>
        <App auth={auth}/>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
