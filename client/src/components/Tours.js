import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TourCard from "./TourCard";
import DescriptionCard from "./DescriptionCard";
import "../styles/tours.css";

const Tours = () => {
  const [tourData, setTourData] = useState([]);

  useEffect(() => {
    const fetchTourData = async () => {
      const response = await fetch("http://localhost:5000/api/tours");
      const data = await response.json();
      setTourData(data.data.tours);
    };
    fetchTourData();
  }, []);

  const tourCards = tourData.map((tour) => {
    const tourStr = tour.name
      .split(" ")
      .map((string) => string.toLowerCase())
      .join("-");
    return (
      <Link to={`/tours/${tourStr}`} key={tour.name}>
        <TourCard
          name={tour.name}
          image={tour.coverImage}
          duration={tour.duration}
          price={tour.price}
          location={tour.region}
        />
      </Link>
    );
  });

  return (
    <div className="tours-container">
      <div className="tour-description">
        <DescriptionCard />
      </div>
      <div className="tour-card-container">{tourCards}</div>
    </div>
  );
};

export default Tours;
