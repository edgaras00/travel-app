import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import DestinationCard from "./DestinationCard";
import DescriptionCard from "./DescriptionCard";
import LocationMap from "./LocationMap";
import london from "../images/london.jpg";
import europe from "../europe.jpg";
import "../styles/destinationDetails.css";

const DestinationDetails = () => {
  const { destinationID } = useParams();
  console.log(destinationID);
  const location = useLocation();
  const locations = [];
  for (let i = 0; i < 4; i++) {
    locations.push(
      <Link to={`${location.pathname}/london`}>
        <DestinationCard name="London" image={london} size="large" />
      </Link>
    );
  }

  const locationCoordinates = {
    London: [51.509865, -0.118092],
    Oxford: [51.752022, -1.257677],
  };

  return (
    <div className="destination-details">
      <div className="destination-description">
        <DescriptionCard image={europe} title={destinationID} />
      </div>
      <div className="destination-at-glance region-at-glance">
        <div className="destination-at-glance-text region-description-text">
          <h2>{destinationID} at a Glance</h2>
        </div>
        <div className="destination-map region-map">
          <LocationMap
            lat={51.509865}
            lon={-0.118092}
            zoom={6}
            coordinates={locationCoordinates}
            pathname={location.pathname}
          />
        </div>
      </div>
      <div className="things-to-do">
        <div className="things-to-do-image"></div>
        <div className="things-list">
          <h2>Top Things to Do in {destinationID}</h2>
          <ul>
            <li>
              <h3>Thing 1</h3>
              <p>
                in nisl nisi scelerisque eu ultrices vitae auctor eu augue ut
                lectus arcu bibendum at varius vel pharetra vel turpis nunc eget
                lorem dolor sed viverra ipsum nunc aliquet bibendum
              </p>
            </li>
            <li>
              <h3>Thing 2</h3>
              <p>
                in nisl nisi scelerisque eu ultrices vitae auctor eu augue ut
                lectus arcu bibendum at varius vel pharetra vel turpis nunc eget
                lorem dolor sed viverra ipsum nunc aliquet bibendum
              </p>
            </li>
            <li>
              <h3>Thing 3</h3>
              <p>
                in nisl nisi scelerisque eu ultrices vitae auctor eu augue ut
                lectus arcu bibendum at varius vel pharetra vel turpis nunc eget
                lorem dolor sed viverra ipsum nunc aliquet bibendum
              </p>
            </li>
            <li>
              <h3>Thing 4</h3>
              <p>
                in nisl nisi scelerisque eu ultrices vitae auctor eu augue ut
                lectus arcu bibendum at varius vel pharetra vel turpis nunc eget
                lorem dolor sed viverra ipsum nunc aliquet bibendum
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="destination-card-container">{locations}</div>
    </div>
  );
};

export default DestinationDetails;
