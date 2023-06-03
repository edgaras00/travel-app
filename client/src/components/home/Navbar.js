import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

import { AppContext } from "../../context/appContext";

import "../../styles/navbar.css";

const Navbar = () => {
  const { user, setUser, setToken } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logOut = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    try {
      let url = "https://paradisetravel-api.onrender.com/api/users/logout";
      if (process.env.REACT_APP_ENV === "development") {
        url = "/api/users/logout";
      }
      const response = await fetch(url);
      await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleNav = () => {
    setIsMenuOpen((prev) => !prev);
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
    <div className={`navbar-container ${isMenuOpen ? "active" : null}`}>
      <div className="logo">
        <Link to="/">
          <h3>Paradise Travel</h3>
        </Link>
      </div>
      <span className="toggle-button" onClick={toggleNav}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </span>
      <div className={`links ${isMenuOpen ? "active" : null}`}>
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
