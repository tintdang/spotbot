import React from "react";
import {withRouter} from 'react-router';
import { Route, Redirect } from "react-router-dom";

import Game from "./pages/Game";
import Callback from "./pages/Callback";
import Homepage from "./pages/Homepage";
import './style.css';
import Waiting from "./pages/Waiting";


const App = props => {

  return (
    <div>
      <Route path="/callback" render={() => (
        <Callback auth={props.auth} />
      )} />
      <Route exact path="/" render={() => {
        return (!props.auth.isAuthenticated()) ? (
          <Homepage auth={props.auth} />
        ) :(<Redirect to="/game" />)
      }} />
      <Route exact path="/game" render={() => {
        return (props.auth.isAuthenticated()) ? (
          <Game auth={props.auth} history={props.history} />
        ) : (<Redirect to="/" />)
      }} />
      <Route exact path="/waiting" render={() => {
        return(<Waiting/>)
      }}/>
    </div>
  )
}

export default withRouter(App);