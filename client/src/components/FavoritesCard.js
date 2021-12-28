import React from "react";
import { Link } from "react-router-dom";
import "../styles/favoriteCard.css";

const FavoritesCard = ({
  image,
  city,
  country,
  title,
  travelPackage,
  duration,
}) => {
  return (
    <div className="favorites-card">
      <div>
        <img src={image} alt="Traveler favorite destination" />
      </div>
      <Link to="/tours">
        <div className="favorites-text-container">
          <div className="favorites-title">
            <div className="title-top">{city}</div>
            <div>{country}</div>
          </div>
          <div className="favorites-text">
            <div>{title}</div>
            <div>{travelPackage}</div>
            <div>{duration}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FavoritesCard;
