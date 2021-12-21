import React from "react";
import { useParams } from "react-router-dom";

const LocationDetails = () => {
  const { locationID } = useParams();
  console.log(locationID);
  return (
    <div>
      <div className="location-description"></div>
      <div className="location-map"></div>
      <div className="things-to-do"></div>
    </div>
  );
};

export default LocationDetails;
