import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faHeart } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@mui/material/Tooltip";
import { AppContext } from "../context/appContext";
import "../styles/tourCard.css";

const TourCard = ({ tourID, image, name, location, duration, price, path }) => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const handleTourBooking = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    navigate("/book", { state: { name, price, tourID } });
  };

  return (
    <div className="tour-card">
      <div className="tour-card-image">
        <img src={image} alt={name} />
      </div>
      <div className="tour-card-text">
        <div className="tour-card-name">
          <h2>{name}</h2>
        </div>
        <div className="tour-card-info">
          <div className="tour-card-location">
            <div>{location}</div>
          </div>

          <div className="tour-card-price">
            <div>{duration} days</div>
            <div>
              from ${price}
              <sup>*</sup>
            </div>
          </div>
        </div>
      </div>
      <div className="tour-card-footer">
        <hr />
        <div className="tour-card-icons">
          <Tooltip title="Details">
            <Link to={path}>
              <FontAwesomeIcon icon={faFlag} className="flag-icon" />
            </Link>
          </Tooltip>
          <Tooltip title="Book">
            <div>
              <FontAwesomeIcon
                icon={faHeart}
                className="heart-icon"
                onClick={handleTourBooking}
              />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
