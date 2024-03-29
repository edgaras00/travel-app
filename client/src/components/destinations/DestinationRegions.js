import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import DestinationCard from "./DestinationCard";
import DescriptionCard from "./DescriptionCard";

import errorRedirect from "../../utils/errorRedirect";
import { AppError } from "../../utils/AppError";

import "../../styles/destinationRegions.css";

const DestinationRegions = () => {
  const [regionData, setRegionData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "https://paradisetravel-api.onrender.com/api/regions";
        if (process.env.REACT_APP_ENV === "development") {
          url = "/api/regions";
        }
        const response = await fetch(url);

        if (response.status !== 200) {
          throw new AppError("Server error", response.status);
        }

        const data = await response.json();
        setRegionData(data.data.regions);
      } catch (error) {
        console.error(error);
        errorRedirect(error.message, navigate);
      }
    };
    fetchData();
  }, [navigate]);

  const regionCards = regionData.map((region) => {
    return (
      <Link to={`/destinations/${region.slug}`} key={region.name}>
        <DestinationCard
          name={region.name}
          image={region.coverImage}
          size="small-card"
        />
      </Link>
    );
  });

  return (
    <div className="destinations">
      <div className="destination-description">
        <DescriptionCard
          image="https://travelappbucket.s3.amazonaws.com/imgs/world.jpg"
          title="A World of Destinations"
          text="One planet. Endless possibilities. The most amazing destinations in the world are waiting for you. Whether you want to escape to a sun-soaked tropical paradise or envision stunning, snow-capped mountains before you, all you need to know is that Paradise Travel is beside you every step of the way."
        />
      </div>
      <h2 className="destination-question">Where Would You Like To Go?</h2>
      <div className="destination-card-container">{regionCards}</div>
    </div>
  );
};

export default DestinationRegions;
