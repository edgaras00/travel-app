import React from "react";
import DestinationCard from "./DestinationCard";
import { Link, useParams, useLocation } from "react-router-dom";
import london from "../images/london.jpg";

const Destinations = () => {
  const { regionID } = useParams();
  const location = useLocation();
  console.log(regionID);

  const destinations = [];
  for (let i = 0; i < 4; i++) {
    destinations.push(
      <Link to={`${location.pathname}/England`}>
        <DestinationCard image={london} name="England" />
      </Link>
    );
  }

  return (
    <div>
      <div className="region-description"></div>
      <div className="region-at-glance">
        <div className="region-description-text"></div>
        <div className="region-map"></div>
        <div className="destination-card-container">{destinations}</div>
      </div>
    </div>
  );
};
export default Destinations;
