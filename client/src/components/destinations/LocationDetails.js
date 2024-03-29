import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import DescriptionCard from "./DescriptionCard";
import LocationMap from "./LocationMap";
import Activities from "./Activities";

import handleErrors from "../../utils/handleErrors";
import errorRedirect from "../../utils/errorRedirect";

import "../../styles/locationDetails.css";

const LocationDetails = () => {
  const [locationData, setLocationData] = useState(null);
  const { locationID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        let url = `https://paradisetravel-api.onrender.com/api/places/${locationID}`;
        if (process.env.REACT_APP_ENV === "development") {
          url = `/api/places/${locationID}`;
        }
        const response = await fetch(url);

        if (response.status !== 200) {
          handleErrors(response.status);
        }

        const data = await response.json();
        setLocationData(data.data.place);
      } catch (error) {
        console.error(error);
        errorRedirect(error.message, navigate);
      }
    };
    fetchLocationData();
  }, [locationID, navigate]);

  let coordinates = [];
  if (locationData) {
    if (locationData.coordinates) {
      coordinates = [
        { name: locationData.name, coordinates: locationData.coordinates },
      ];
    }
  }

  return (
    <div className="location-details">
      <div className="location-description region-description">
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
      </div>
    </div>
  );
};

export default LocationDetails;
