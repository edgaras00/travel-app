import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DescriptionCard from "./DescriptionCard";
import LocationMap from "./LocationMap";
// import { capitalizeAll } from "../utils/capitalize";
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

  let thingsToDo = [];
  let coordinates = [];
  if (locationData) {
    if (locationData.thingsToDo) {
      thingsToDo = locationData.thingsToDo.map((activity) => {
        return (
          <li key={activity.name}>
            <h3>{activity.name}</h3>
            <p>{activity.text}</p>
          </li>
        );
      });
    }
    if (locationData.coordinates) {
      coordinates = [
        { name: locationData.name, coordinates: locationData.coordinates },
      ];
    }
  }

  return (
    <div>
      <div className="location-description">
        <DescriptionCard
          image={locationData ? locationData.coverImage : null}
          text={locationData ? locationData.description : null}
        />
      </div>
      <div className="location-map">
        <LocationMap
          center={locationData ? locationData.coordinates : ["", ""]}
          zoom={3}
          coordinates={coordinates}
        />
      </div>
      <div className="things-to-do">
        <div className="things-to-do-image"></div>
        <div className="things-list">
          <h2>Top Things to Do in {locationID}</h2>
          <ul>{thingsToDo}</ul>
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;
