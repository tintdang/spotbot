import React from "react";

const Homepage = props =>

  <div>
    <h1>Welcome to the Game</h1>
    <button onClick={props.auth.login}>Click Here to Login</button>
  </div>;

export default Homepage;