import React from "react";
import "../styles/favoriteCard.css";

const FavoritesCard = ({
  image,
  city,
  country,
  hotel,
  travelPackage,
  duration,
}) => {
  return (
    <div className="favorites-card">
      <div>
        <img src={image} alt="Traveler favorite destination" />
      </div>
      <div className="favorites-text-container">
        <div className="favorites-title">
          <div className="title-top">{city}</div>
          <div>{country}</div>
        </div>
        <div className="favorites-text">
          <div>{hotel}</div>
          <div>{travelPackage}</div>
          <div>{duration}</div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesCard;
