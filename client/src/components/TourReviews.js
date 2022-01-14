import React, { useState } from "react";
import ReviewCard from "./ReviewCard";
import ReviewOverall from "./ReviewOverall";
import "../styles/tourReviews.css";

const TourReviews = ({ reviewData, averageRating, tourID }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  let reviewCards = [];
  if (reviewData) {
    reviewCards = reviewData.map((review, index) => {
      return (
        <ReviewCard
          key={index}
          rating={review.rating}
          header={review.header}
          name={review.user.name}
          text={review.text}
        />
      );
    });
  }

  return (
    <div className="review-container">
      <div className="review-container-header">
        <h2>Traveler Reviews</h2>
      </div>
      <div className="review-summary">
        <ReviewOverall
          averageRating={averageRating}
          reviewData={reviewData ? reviewData : null}
          openModal={openModal}
          closeModal={closeModal}
          isModalOpen={isModalOpen}
          tourID={tourID}
        />
      </div>
      <div className="review-cards">{reviewCards}</div>
    </div>
  );
};

export default TourReviews;
