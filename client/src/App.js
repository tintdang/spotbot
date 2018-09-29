import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Game from "./pages/Game";
import Callback from "./pages/Callback";
import Homepage from "./pages/Homepage";
import './style.css';

const App = props => {

  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/callback" render={() => (
            <Callback auth={props.auth}/>
          )}/>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/game" render={() => {
            return (props.auth.isAuthenticated()) ? (
              <Game auth={props.auth} {...props}/>
            ) : (<Redirect to="/"/>)}}/>

        </Switch>
      </div>
    </Router>
  )
}

export default App;