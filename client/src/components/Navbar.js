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
        <Link to="/vacations">
          <span>Vacations</span>
        </Link>
        <Link to="/destinations">
          <span>Destinations</span>
        </Link>
        <Link to="/tours">
          <span>Guided Tours</span>
        </Link>
        <Link to="/blog">
          <span>Blog</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
