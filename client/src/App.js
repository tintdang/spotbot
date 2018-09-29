import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Game from "./pages/Game";
import Callback from "./pages/Callback";
import './style.css';

const App = props => {
  const { isAuthenticated } = props.auth;

  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/callback" render={() => (
            <Callback auth={props.auth}/>
          )}/>
          <Route exact path="/" component={Game} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;