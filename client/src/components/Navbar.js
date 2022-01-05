import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../context/appContext";

import "../styles/navbar.css";

const Navbar = () => {
  const { user, setUser } = useContext(AppContext);

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("user");
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
        <Link to="/blog">
          <span>Blog</span>
        </Link>
        {user ? (
          <span onClick={logOut}>Log Out</span>
        ) : (
          <Link to="/login">
            <span>Log In</span>
          </Link>
        )}
        {/* <Link to="/cart">
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="shopping-cart-nav"
          />
        </Link> */}
      </div>
    </div>
  );
};

export default Navbar;
