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
      <div className="destination-description">
        <DescriptionCard
          image="https://travelappbucket.s3.amazonaws.com/imgs/tours-cover.jpg"
          title="See the World Like Never Before"
          text="Guided Tours through Paradise Travel are immersive excursions with authentic experiences that highlight the local culture. Enjoy the world’s iconic attractions with VIP passes, hotels, and transportation taken care of, plus get under-the-radar insights, not typically available to independent travelers. Whether you’re traveling solo, with adults-only or with family, Paradise Travel will match you up with a professional guide who’ll personalize your vacation with a range of fascinating and unique experiences that really bring each destination to life."
        />
      </div>
      <h2 className="tours-header">Guided Tours</h2>
      <div className="tour-card-container">{tourCards}</div>
    </div>
  );
};

export default Tours;
