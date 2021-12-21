import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="logo">
        <Link to="/">
          <h3>Paradise Travel</h3>
        </Link>
      </div>
      <div className="links">
        <span>Vacations</span>
        <Link to="/destinations">
          <span>Destinations</span>
        </Link>
        <span>Guided Tours</span>
        <span>Blog</span>
      </div>
    </div>
  );
};

export default Navbar;
