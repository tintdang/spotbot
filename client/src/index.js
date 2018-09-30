import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Auth from "./utils/Auth/Auth";

// Create an instance of our Auth
const auth = new Auth();

// Pass the auth as a prop from the root so that the rest of the app can use it
//Using BrowserRouter creates a history so that we do not need to define it in our app
ReactDOM.render(
    <BrowserRouter>
        <App auth={auth} />
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
