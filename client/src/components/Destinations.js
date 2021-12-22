import React from "react";
import DescriptionCard from "./DescriptionCard";
import DestinationCard from "./DestinationCard";
import LocationMap from "./LocationMap";
import { Link, useParams, useLocation } from "react-router-dom";
import london from "../images/london.jpg";
import europe from "../europe.jpg";
import "../styles/destinations.css";

const Destinations = () => {
  const { regionID } = useParams();
  const location = useLocation();

  const locationCoordinates = {
    Italy: [41.902782, 12.496366],
    England: [51.509865, -0.118092],
    France: [48.864716, 2.349014],
    Lithuania: [54.687157, 25.279652],
  };

  const destinations = [];
  for (let i = 0; i < 12; i++) {
    destinations.push(
      <Link to={`${location.pathname}/England`}>
        <DestinationCard image={london} name="England" />
      </Link>
    );
  }

  return (
    <div className="destinations-container">
      <div className="region-description">
        <DescriptionCard image={europe} title={regionID} text="Lorem" />
      </div>
      <div className="region-at-glance">
        <div className="region-description-text">
          <h2>{regionID} at a Glance</h2>
          <p>
            European countries welcome almost a half-billion international
            visitors per year. Not only is it the most popular destination for
            Americans traveling overseas, it’s also the easiest, thanks to:
            <ul>
              <li>an open borders policy</li>
              <li>efficient travel infrastructure</li>
              <li>
                a common currency, Euro (€) in most of the individual countries
              </li>
            </ul>
          </p>
          <br />
          <p>
            Traveling to Europe is quite simple for American citizens as a visa
            is not required for countries of the European Union and/or the 26
            countries that fall under the Schengen Area (your Liberty Travel
            consultant will be happy to assist you with this). Once you land in
            any of these countries, your passport is stamped, leaving you free
            to travel across borders—so you can go from London to Paris to
            Netherlands seamlessly. Trains, budget airlines, and cars are the
            most popular ways to travel around this beautiful continent.
          </p>
        </div>
        <div className="region-map">
          <LocationMap
            lat={53}
            lon={12}
            zoom={4}
            coordinates={locationCoordinates}
            pathname={location.pathname}
          />
        </div>
      </div>
      <h2 className="destination-list-header">
        Popular {regionID} Destinations
      </h2>
      <div className="destination-card-container">{destinations}</div>
    </div>
  );
};
export default Destinations;
