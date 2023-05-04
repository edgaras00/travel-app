import { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";

// Components
import DescriptionCard from "./DescriptionCard";
import DestinationCard from "./DestinationCard";
import LocationMap from "./LocationMap";

import { capitalizeAll } from "../../utils/capitalize";
import slugify from "../../utils/slugify";
import handleErrors from "../../utils/handleErrors";
import errorRedirect from "../../utils/errorRedirect";

import "../../styles/destinations.css";

const Destinations = () => {
  const [destinationData, setDestinationData] = useState([]);
  const [regionData, setRegionData] = useState(null);

  const { regionID } = useParams();
  const pathLocation = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let regionStr = capitalizeAll(regionID, "+");
    if (regionID === "usa") regionStr = regionID.toUpperCase();
    const fetchRegionData = async () => {
      try {
        const response = await fetch(
          `/api/regions/${regionID}`
          // `https://travelparadise.herokuapp.com/api/regions/${regionID}`
        );

        if (response.status !== 200) {
          handleErrors(response.status);
        }

        const data = await response.json();
        setRegionData(data.data.region);
      } catch (error) {
        console.log(error);
        errorRedirect(error.message, navigate);
      }
    };
    const fetchDestinations = async () => {
      try {
        const response = await fetch(
          `/api/destinations?region=${regionStr}`
          // `https://travelparadise.herokuapp.com/api/destinations?region=${regionStr}`
        );
        const data = await response.json();
        setDestinationData(data.data.destinations);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDestinations();
    fetchRegionData();
  }, [regionID, navigate]);

  let cardContainerClass;
  let cardSize = "small-card";
  if (destinationData.length === 1 || destinationData.length === 2) {
    cardContainerClass = "single-card";
    cardSize = "large-card";
  } else if (destinationData.length === 3) {
    cardContainerClass = "three-cards";
    cardSize = "medium-card";
  } else if (destinationData.length === 4) {
    cardContainerClass = "four-cards";
    cardSize = "large-card";
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

  let regionCoordinates = [];
  if (regionData) {
    regionCoordinates = regionData.destinationCoordinates.map(
      (destination) => ({
        ...destination,
        slug: slugify(destination.name),
      })
    );
  }

  let mapZoom = 4;
  if (
    regionID === "asia" ||
    regionID === "south-america" ||
    regionID === "africa" ||
    regionID === "north-america"
  ) {
    mapZoom = 3;
  } else if (regionID === "antarctica") {
    mapZoom = 2;
  }

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
      <div className="destination-at-glance">
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
            zoom={mapZoom}
            coordinates={regionCoordinates}
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
