import React from "react";
import { useParams } from "react-router-dom";
import DescriptionCard from "./DescriptionCard";
import LocationMap from "./LocationMap";
import "../styles/locationDetails.css";
import europe from "../imgs/europe.jpg";

const LocationDetails = () => {
  const { locationID } = useParams();
  console.log(locationID);
  const locationCoordinates = { London: [51.509865, -0.118092] };
  return (
    <div>
      <div className="location-description">
        <DescriptionCard image={europe} />
      </div>
      <div className="location-map">
        <LocationMap
          lat={51.509865}
          lon={-0.118092}
          zoom={7}
          coordinates={locationCoordinates}
        />
      </div>
      <div className="things-to-do">
        <div className="things-to-do-image"></div>
        <div className="things-list">
          <h2>Top Things to Do in {locationID}</h2>
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
    </div>
  );
};

export default LocationDetails;
