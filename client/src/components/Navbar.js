import React from "react";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="logo">
        <h3>Paradise Travel</h3>
      </div>
      <div className="links">
        <span>Vacations</span>
        <span>Destinations</span>
        <span>Guided Tours</span>
        <span>Blog</span>
      </div>
    </div>
  );
};

export default Navbar;
