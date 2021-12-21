import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import DestinationCard from "./DestinationCard";
import london from "../images/london.jpg";

const DestinationDetails = () => {
  const { destinationID } = useParams();
  console.log(destinationID);
  const location = useLocation();
  const locations = [];
  for (let i = 0; i < 4; i++) {
    locations.push(
      <Link to={`${location.pathname}/london`}>
        <DestinationCard name="London" image={london} />
      </Link>
    );
  }
  return (
    <div className="destination-details">
      <div className="destination-description"></div>
      <div className="destination-at-glance">
        <div className="destination-at-glance-text"></div>
        <div className="destination-map"></div>
      </div>
      <div className="things-to-do"></div>
      <div className="destination-card-container">{locations}</div>
    </div>
  );
};

export default DestinationDetails;
