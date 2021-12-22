import React from "react";
import "../styles/destinationCard.css";

const DestinationCard = ({ image, name, size }) => {
  const style = {
    backgroundImage: `url(${image})`,
  };

  // const cardSize = size === "large" ? "card-large" : "card-small";

  return (
    <div className={`destination-card`} style={style}>
      <div>{name}</div>
    </div>
  );
};

export default DestinationCard;
