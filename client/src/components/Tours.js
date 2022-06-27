import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TourCard from "./TourCard";
import DescriptionCard from "./DescriptionCard";
import errorRedirect from "../utils/errorRedirect";
import "../styles/tours.css";

const Tours = () => {
  const [tourData, setTourData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        // const response = await fetch("http://localhost:5000/api/tours");
        const response = await fetch(
          `https://travelparadise.herokuapp.com/api/tours`
        );

        if (response.status !== 200) {
          throw new Error("Resource not found");
        }

        const data = await response.json();
        setTourData(data.data.tours);
      } catch (error) {
        console.log(error);
        errorRedirect(error.message, navigate);
      }
    };
    fetchTourData();
  }, [navigate]);

  const tourCards = tourData.map((tour) => {
    return (
      <TourCard
        key={tour.name}
        tourID={tour._id}
        name={tour.name}
        image={tour.coverImage}
        duration={tour.duration}
        price={tour.price}
        location={tour.region}
        path={`/tours/${tour.slug}`}
      />
    );
  });

  return (
    <div className="tours-container">
      <div className="destination-description region-description">
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
