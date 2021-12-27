import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DestinationCard from "./DestinationCard";
import "../styles/destinationRegions.css";

const DestinationRegions = () => {
  const [regionData, setRegionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/regions");
        const data = await response.json();
        setRegionData(data.data.regions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const regionCards = regionData.map((region) => {
    return (
      <Link to={`/destinations/${region.name.toLowerCase()}`} key={region.name}>
        <DestinationCard name={region.name} image={region.coverImage} />
      </Link>
    );
  });

  return (
    <div className="destinations">
      <h1>Where Would You Like To Go?</h1>
      {/* <div className="top-row">{destinationCards.slice(0, 3)}</div> */}
      <div className="destination-card-container">{regionCards}</div>
    </div>
  );
};

export default DestinationRegions;
