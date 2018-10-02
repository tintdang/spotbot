import React, { Component } from "react";
import { Router, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Game from "./pages/Game";
import Callback from "./pages/Callback";
import Homepage from "./pages/Homepage";
import './style.css';
import Auth from './utils/Auth/Auth';
import history from './utils/History/history'

const auth = new Auth();

class App extends Component {
  render() {

    return (
      <Router history={history}>
        <div>
          <Navbar />
          <Route exact path="/" render={(props) => {
            return (auth.isAuthenticated()) ? (
              <Homepage auth={auth} {...props} />
            ) : (<Redirect to="/game" />)
          }} />
          <Route exact path="/game" render={(props) => {
            return (auth.isAuthenticated()) ? (
              <Game auth={auth} {...props} />
            ) : (<Redirect to="/" />)
          }} />
          <Route path="/callback" render={
            (props) => {
              auth.handleAuthentication(props);
              return <Callback {...props} />
            }
          } />

        </div>
      </Router>
    )
  }
}

export default App;