import React from "react";
import "../styles/destinationCard.css";

const DestinationCard = ({ image, name, size }) => {
  const style = {
    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5) ), url(${image})`,
  };

  console.log(size);

  return (
    <div className={`destination-card ${size}`} style={style}>
      <div className="destination-name">{name}</div>
    </div>
  );
};

export default DestinationCard;
