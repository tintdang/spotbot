import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Auth from "./utils/Auth/Auth";

// Create an instance of our Auth
const auth = new Auth();

// Pass the auth as a prop from the root so that the rest of the app can use it
ReactDOM.render(<App auth={auth} />, document.getElementById('root'));
registerServiceWorker();
