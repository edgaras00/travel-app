import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/favoriteCard.css";

const FavoritesCard = ({
  image,
  city,
  country,
  title,
  travelPackage,
  duration,
  path,
}) => {
  const [hoverClass, setHoverClass] = useState(null);

  const handleMouseOver = () => {
    setHoverClass("hovered");
  };

  const handleMouseOut = () => {
    setHoverClass(null);
  };

  return (
    <div
      className={"favorites-card"}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <Link to={path}>
        <div className="favorite-card-content">
          <div className="favorite-image-wrapper">
            <img src={image} alt="Traveler favorite destination" />
          </div>
          <div className={`favorites-text-container ${hoverClass}`}>
            <div className="favorites-title">
              <div className="title-top">{city}</div>
              <div className="title-country">{country}</div>
            </div>
            <div className="favorites-text">
              <div>{title}</div>
              <div>{travelPackage}</div>
              <div>{duration}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FavoritesCard;
