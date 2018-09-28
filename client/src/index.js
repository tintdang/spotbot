import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Auth from "./utils/Auth/Auth";

const auth = new Auth();

ReactDOM.render(<App auth={auth} />, document.getElementById('root'));
registerServiceWorker();
