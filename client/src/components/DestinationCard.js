import React from "react";
import "../styles/destinationCard.css";

const DestinationCard = ({ image, name }) => {
  const style = {
    backgroundImage: `url(${image})`,
  };

  return (
    <div className="destination-card" style={style}>
      <div>{name}</div>
    </div>
  );
};

export default DestinationCard;
