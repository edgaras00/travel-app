import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/appContext";

import "../styles/navbar.css";

const Navbar = () => {
  const { user, setUser } = useContext(AppContext);

  const logOut = async () => {
    localStorage.removeItem("user");
    setUser(null);
    try {
      const response = await fetch("/api/users/logout");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar-container">
      <div className="logo">
        <Link to="/">
          <h3>Paradise Travel</h3>
        </Link>
      </div>
      <div className="links">
        <Link to="/destinations">
          <span>Destinations</span>
        </Link>
        <Link to="/tours">
          <span>Guided Tours</span>
        </Link>

        {user ? (
          <span onClick={logOut} className="logout-button">
            Log Out
          </span>
        ) : (
          <Link to="/login">
            <span>Log In</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
