import React from "react";
import "../styles/offerCard.css";

const OfferCard = ({ image, title, text }) => {
  return (
    <div className="offer-card">
      <div className="offer-card-img-container">
        <img src={image} alt="offer" />
      </div>
      <div className="offer-card-text-container">
        <div className="offer-card-title-container">
          <div className="offer-card-title">{title}</div>
        </div>
        <div className="offer-card-text">{text}</div>
      </div>
    </div>
  );
};

export default OfferCard;
