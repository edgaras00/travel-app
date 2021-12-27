import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faHeart } from "@fortawesome/free-solid-svg-icons";
import "../styles/tourCard.css";

const TourCard = ({ image, name, location, duration, price, rating }) => {
  return (
    <div className="tour-card">
      <div className="tour-card-image">
        <img src={image} alt={name} />
      </div>
      <div className="tour-card-text">
        <div className="tour-card-name">
          <h2>{name}</h2>
        </div>
        <div className="tour-card-location">
          <div>{location}</div>
        </div>
      </div>
      <div className="tour-card-price">
        <div>{duration} days</div>
        <div>
          from {price}
          <sup>*</sup>
        </div>
      </div>
      <div className="tour-card-footer">
        <hr />
        <div className="tour-card-icons">
          <FontAwesomeIcon icon={faFlag} className="flag-icon" />
          <FontAwesomeIcon icon={faHeart} className="flag-icon" />
        </div>
      </div>
    </div>
  );
};

export default TourCard;
