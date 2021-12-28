import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DestinationCard from "./DestinationCard";
import DescriptionCard from "./DescriptionCard";
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
      <Link to={`/destinations/${region.slug}`} key={region.name}>
        <DestinationCard name={region.name} image={region.coverImage} />
      </Link>
    );
  });

  return (
    <div className="destinations">
      <div className="destination-description">
        <DescriptionCard
          image="https://travelappbucket.s3.amazonaws.com/imgs/world.jpg"
          title="A World of Destinations"
          text="One planet. Endless possibilities. The most amazing destinations in the world are waiting for you. Whether you want to escape to a sun-soaked tropical paradise or envision stunning, snow-capped mountains before you, all you need to know is that Paradise Travel is beside you every step of the way."
        />
      </div>
      <h1 className="destination-question">Where Would You Like To Go?</h1>
      {/* <div className="top-row">{destinationCards.slice(0, 3)}</div> */}
      <div className="destination-card-container">{regionCards}</div>
    </div>
  );
};

export default DestinationRegions;
