import React, { useState } from "react";
import ReviewCard from "./ReviewCard";
import ReviewOverall from "./ReviewOverall";
import "../styles/tourReviews.css";
import ReviewModal from "./ReviewModal";

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
      <ReviewModal isModalOpen={isModalOpen} closeModal={closeModal} />
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
      <div className="review-cards">
        {reviewCards}
        <ReviewCard
          rating={4}
          header="We enjoyed it"
          name="Lorem Ipsum"
          text="pellentesque sit amet porttitor eget dolor morbi non arcu risus quis varius quam quisque id diam vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas maecenas pharetra convallis posuere morbi"
        />
      </div>
    </div>
  );
};

export default TourReviews;
