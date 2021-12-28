import React from "react";
import "../styles/descriptionCard.css";

const DescriptionCard = ({ image, title, text }) => {
  return (
    <div className="description-card">
      <div className="description-card-image">
        <img src={image} alt={title} />
      </div>
      <div className="description-card-text-container">
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default DescriptionCard;
