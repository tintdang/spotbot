import React from "react";
import '../../assets/style.css';
// import '../../../src/assets/images/'

const Navbar = () =>
  <nav>
    <div
      id="nav-style"
      className="nav-bar">
      <div className="Navbar-nav">
        <div className="brand">
        <img alt="Spot" id="logo2" src="assets/images/spottobotto.svg" />
        <h2>SpotBot</h2>
        </div>
      </div>
    </div>
  </nav>;

export default Navbar;