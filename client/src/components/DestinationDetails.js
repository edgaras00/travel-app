import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import DestinationCard from "./DestinationCard";
import DescriptionCard from "./DescriptionCard";
import LocationMap from "./LocationMap";

import { capitalizeAll } from "../utils/capitalize";
import "../styles/destinationDetails.css";

const DestinationDetails = () => {
  const [destinationData, setDestinationData] = useState(null);
  const { destinationID } = useParams();
  const pathLocation = useLocation();

  useEffect(() => {
    // const destinationStr = capitalizeAll(destinationID, "+");
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

  console.log(destinationData);

  let locations = [];
  let locationCoordinates = [];
  let mapCenter = ["", ""];
  let thingsToDo = [];
  if (destinationData) {
    if (destinationData.places.length > 0) {
      locations = destinationData.places.map((location) => {
        return (
          <Link
            to={`${pathLocation.pathname}/${location.name.toLowerCase()}`}
            key={location.name}
          >
            <DestinationCard name={location.name} image={location.coverImage} />
          </Link>
        );
      });

      locationCoordinates = destinationData.places.map((location) => {
        return { name: location.name, coordinates: location.coordinates };
      });

      mapCenter = destinationData.places
        ? destinationData.places[0].coordinates
        : ["", ""];
    }

    thingsToDo = destinationData.thingsToDo.map((activity) => {
      return (
        <li key={activity.name}>
          <h3>{activity.name}</h3>
          <p>{activity.text}</p>
        </li>
      );
    });
  }

  return (
    <div className="destination-details">
      <div className="destination-description">
        <DescriptionCard
          image={destinationData ? destinationData.coverImage : null}
          title={destinationData ? destinationData.name : null}
          text={destinationData ? destinationData.description : null}
        />
      </div>
      <div className="destination-at-glance region-at-glance">
        <div className="destination-at-glance-text region-description-text">
          <h2>{destinationData ? destinationData.name : null} at a Glance</h2>
          <div>{destinationData ? destinationData.weather : null}</div>
          <div>{destinationData ? destinationData.currency : null}</div>
          <div>{destinationData ? destinationData.language : null}</div>
          <div>{destinationData ? destinationData.bestTimeToVisit : null}</div>
        </div>
        <div className="destination-map region-map">
          <LocationMap
            center={mapCenter}
            zoom={6}
            coordinates={locationCoordinates}
            pathname={pathLocation.pathname}
          />
        </div>
      </div>
      <div className="things-to-do">
        <div className="things-to-do-image"></div>
        <div className="things-list">
          <h2>Top Things to Do in {capitalizeAll(destinationID)}</h2>
          <ul>{thingsToDo}</ul>
        </div>
      </div>
      <div className="destination-card-container">{locations}</div>
    </div>
  );
};

export default DestinationDetails;
