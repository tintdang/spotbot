import React from "react";
import '../../assets/style.css';
// import '../../../src/assets/images/'

const Navbar = () =>
  <nav>
    <div
      id="nav-style"
      className="nav-bar">
      <div className="Navbar-nav">
        {/* <h1>SPOT-BOT</h1> */}
        <div>
        {/* <img id="logo" src="./assets/images/Spot_Bot_Logo.png" /> */}
        <img id="logo" src="./assets/images/Spot_Bot_White_Shadow.png" />
        </div>
      </div>
    </div>
  </nav>;

export default Navbar;