import React from "react";
import "../styles/card.css";

const Card = ({ icon, title, text }) => {
  return (
    <div className="card">
      <div>
        <img src={icon} alt="card icon" />
      </div>
      <div className="title">{title}</div>
      <div className="text">{text}</div>
    </div>
  );
};

export default Card;
