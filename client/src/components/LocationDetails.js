import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DescriptionCard from "./DescriptionCard";
import LocationMap from "./LocationMap";
import Activities from "./Activities";
import "../styles/locationDetails.css";

const LocationDetails = () => {
  const [locationData, setLocationData] = useState(null);
  const { locationID } = useParams();

  useEffect(() => {
    // let locationStr = capitalizeAll(locationID, "+");

    const fetchLocationData = async () => {
      const response = await fetch(
        `http://localhost:5000/api/places/${locationID}`
      );
      const data = await response.json();
      setLocationData(data.data.place);
    };
    fetchLocationData();
  }, [locationID]);

  let coordinates = [];
  if (locationData) {
    if (locationData.coordinates) {
      coordinates = [
        { name: locationData.name, coordinates: locationData.coordinates },
      ];
    }
  }

  console.log(locationData);

  return (
    <div className="location-details">
      <div className="location-description">
        <DescriptionCard
          image={locationData ? locationData.coverImage : null}
          text={locationData ? locationData.description : null}
        />
      </div>
      <div className="location-map-wrapper">
        <div className="location-map">
          <LocationMap
            center={locationData ? locationData.coordinates : ["", ""]}
            zoom={8}
            coordinates={coordinates}
          />
        </div>
      </div>
      <div className="activity-container">
        {locationData && locationData.thingsToDo.length > 0 ? (
          <Activities
            activityData={locationData.thingsToDo}
            destinationID={locationID}
          />
        ) : null}

        {/* <div className="things-to-do-image"></div>
        {thingsToDo.length > 0 ? (
          <div className="things-list">
            <h2>Top Things to Do in {locationID}</h2>
            <ul>{thingsToDo}</ul>
          </div>
        ) : null} */}
      </div>
    </div>
  );
};

export default LocationDetails;
