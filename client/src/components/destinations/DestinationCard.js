import { useState } from "react";
import "../../styles/destinationCard.css";

const DestinationCard = ({ image, name, size }) => {
  const [cardStyle, setCardStyle] = useState(
    `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5) ), url(${image})`
  );

  const handleMouseOver = () => {
    setCardStyle(
      `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3) ), url(${image})`
    );
  };

  const handleMouseOut = () => {
    setCardStyle(
      `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5) ), url(${image})`
    );
  };

  return (
    <div
      className={`destination-card ${size}`}
      style={{ backgroundImage: cardStyle }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className="destination-name">{name}</div>
    </div>
  );
};

export default DestinationCard;
