import React from "react";
import { Link } from "react-router-dom";
import DestinationCard from "./DestinationCard";
import "../styles/destinationRegions.css";
import london from "../images/london.jpg";

const DestinationRegions = () => {
  const destinationCards = [];
  for (let i = 0; i < 12; i++) {
    destinationCards.push(
      <Link to="/destinations/Europe">
        <DestinationCard name="Europe" image={london} />
      </Link>
    );
  }

  return (
    <div className="destinations">
      <h1>Where Would You Like To Go?</h1>
      {/* <div className="top-row">{destinationCards.slice(0, 3)}</div> */}
      <div className="destination-card-container">{destinationCards}</div>
    </div>
  );
};

export default DestinationRegions;
