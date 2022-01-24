import React, { useContext } from "react";
import { Link } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

// import UserPopover from "./UserPopover";
import { AppContext } from "../context/appContext";

import "../styles/navbar.css";

const Navbar = () => {
  const { user, setUser } = useContext(AppContext);

  const logOut = async () => {
    localStorage.removeItem("user");
    setUser(null);
    try {
      const response = await fetch("/api/users/logout");
      await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">{user ? user.name : ""}</Popover.Header>
      <Popover.Body>
        <div className="user-options">
          <Link to="/orders" className="option-element">
            Orders
          </Link>
          <div className="option-element" onClick={logOut}>
            Log Out
          </div>
        </div>
      </Popover.Body>
    </Popover>
  );

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
          <OverlayTrigger
            trigger="click"
            rootClose
            placement="bottom"
            overlay={popover}
          >
            <span className="popover-trigger">User</span>
          </OverlayTrigger>
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
