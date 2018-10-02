import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Create an instance of our Auth

// Pass the auth as a prop from the root so that the rest of the app can use it
//Using BrowserRouter creates a history so that we do not need to define it in our app
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
