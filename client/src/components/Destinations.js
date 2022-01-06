import React, { useState, useEffect } from "react";
import DescriptionCard from "./DescriptionCard";
import DestinationCard from "./DestinationCard";
import LocationMap from "./LocationMap";
import { Link, useParams, useLocation } from "react-router-dom";
import { capitalizeAll } from "../utils/capitalize";
import slugify from "../utils/slugify";
import "../styles/destinations.css";

const Destinations = () => {
  const [destinationData, setDestinationData] = useState([]);
  const [regionData, setRegionData] = useState(null);

  const { regionID } = useParams();
  const pathLocation = useLocation();

  useEffect(() => {
    let regionStr = capitalizeAll(regionID, "+");
    if (regionID === "usa") regionStr = regionID.toUpperCase();
    const fetchRegionData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/regions/${regionID}`
        );
        const data = await response.json();
        setRegionData(data.data.region);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchDestinations = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/destinations?region=${regionStr}`
        );
        const data = await response.json();
        setDestinationData(data.data.destinations);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDestinations();
    fetchRegionData();
  }, [regionID]);

  let cardContainerClass;
  let cardSize = "small";
  if (destinationData.length === 1 || destinationData.length === 2) {
    cardContainerClass = "single-card";
    cardSize = "large";
  } else if (destinationData.length === 3) {
    cardContainerClass = "three-cards";
    cardSize = "medium";
  } else if (destinationData.length === 4) {
    cardContainerClass = "four-cards";
    cardSize = "large";
  }

  const destinationCards = destinationData.map((destination) => {
    return (
      <Link
        to={`${pathLocation.pathname}/${slugify(destination.name)}`}
        key={destination.name}
      >
        <DestinationCard
          image={destination.coverImage}
          name={destination.name}
          size={cardSize}
        />
      </Link>
    );
  });

  return (
    <div className="destinations-container">
      <div className="region-description">
        {regionData ? (
          <DescriptionCard
            image={regionData.coverImage}
            title={regionData.name}
            text={regionData.description}
          />
        ) : null}
      </div>
      <div className="region-at-glance">
        <div className="region-description-text">
          {regionData ? <h2>{regionData.name} at a Glance</h2> : null}
          {regionData ? <p>{regionData.regionAtGlance}</p> : null}
        </div>
        <div className="region-map">
          <LocationMap
            center={
              regionData
                ? [
                    regionData.regionCoordinates[0],
                    regionData.regionCoordinates[1],
                  ]
                : ["", ""]
            }
            zoom={4}
            coordinates={regionData ? regionData.destinationCoordinates : ""}
            pathname={pathLocation.pathname}
          />
        </div>
      </div>
      <h2 className="destination-list-header">
        Popular {regionData ? regionData.name : ""} Destinations
      </h2>
      <div className={`destination-card-container ${cardContainerClass}`}>
        {destinationCards}
      </div>
    </div>
  );
};
export default Destinations;
