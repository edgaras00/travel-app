import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import DestinationCard from "./DestinationCard";
import DescriptionCard from "./DescriptionCard";
import LocationMap from "./LocationMap";
import Activities from "./Activities";
import DestinationGlance from "./DestinationGlance";

import "../styles/destinationDetails.css";

const DestinationDetails = () => {
  const [destinationData, setDestinationData] = useState(null);
  const { destinationID } = useParams();
  const pathLocation = useLocation();

  useEffect(() => {
    const fetchDestinationData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/destinations/${destinationID}`
        );
        const data = await response.json();
        setDestinationData(data.data.destination);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDestinationData();
  }, [destinationID]);

  let cardContainerClass;
  let cardSize = "small";

  let locations = [];
  let locationCoordinates = [];
  let mapCenter = ["", ""];
  if (destinationData) {
    if (destinationData.places.length > 0) {
      if (
        destinationData.places.length === 1 ||
        destinationData.places.length === 2
      ) {
        cardContainerClass = "single-card";
        cardSize = "large";
      } else if (destinationData.places.length === 3) {
        cardContainerClass = "three-cards";
        cardSize = "medium";
      } else if (destinationData.places.length === 4) {
        cardContainerClass = "four-cards";
        cardSize = "large";
      } else if (destinationData.places.length === 6) {
        cardContainerClass = "six-cards";
        cardSize = "medium";
      }

      locations = destinationData.places.map((location) => {
        return (
          <Link
            to={`${pathLocation.pathname}/${location.slug}`}
            key={location.name}
          >
            <DestinationCard
              name={location.name}
              image={location.coverImage}
              size={cardSize}
            />
          </Link>
        );
      });

      locationCoordinates = destinationData.places.map((location) => {
        return {
          name: location.name,
          coordinates: location.coordinates,
          slug: location.slug,
        };
      });

      mapCenter = destinationData.places
        ? destinationData.places[0].coordinates
        : ["", ""];
    }
  }

  let mapZoom = 6;
  if (
    destinationID === "france" ||
    destinationID === "italy" ||
    destinationID === "spain" ||
    destinationID === "california" ||
    destinationID === "nevada" ||
    destinationID === "thailand" ||
    destinationID === "colombia"
  ) {
    mapZoom = 5;
  } else if (destinationID === "china" || destinationID === "brazil") {
    mapZoom = 4;
  } else if (destinationID === "netherlands" || destinationID === "louisiana") {
    mapZoom = 8;
  } else if (
    destinationID === "chile" ||
    destinationID === "australia" ||
    destinationID === "canada"
  ) {
    mapZoom = 3;
  } else if (destinationID === "bahamas" || destinationID === "barbados") {
    mapZoom = 11;
  }

  return (
    <div className="destination-details">
      <div className="destination-description region-description">
        <DescriptionCard
          image={destinationData ? destinationData.coverImage : null}
          title={destinationData ? destinationData.name : null}
          text={destinationData ? destinationData.description : null}
        />
      </div>
      <div className="destination-at-glance">
        <DestinationGlance
          name={destinationData && destinationData.name}
          weather={destinationData && destinationData.weather}
          currency={destinationData && destinationData.currency}
          language={destinationData && destinationData.language}
          bestTimeToVisit={destinationData && destinationData.bestTimeToVisit}
        />
        <div className="destination-map region-map">
          <LocationMap
            center={mapCenter}
            zoom={mapZoom}
            coordinates={locationCoordinates}
            pathname={pathLocation.pathname}
          />
        </div>
      </div>
      <div className="activity-container">
        <Activities
          activityData={destinationData ? destinationData.thingsToDo : []}
          destinationID={destinationID}
        />
      </div>
      <div className={`destination-card-container ${cardContainerClass}`}>
        {locations}
      </div>
    </div>
  );
};

export default DestinationDetails;
