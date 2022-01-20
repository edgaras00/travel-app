import React from "react";
import ReviewCard from "./ReviewCard";

const CurrentReviews = ({
  currentReviews,
  openModal,
  isModalOpen,
  closeModal,
  tourID,
  toggleReviewUpdate,
}) => {
  return (
    currentReviews &&
    currentReviews.map((review, index) => {
      return (
        <ReviewCard
          key={index}
          rating={review.rating}
          header={review.header}
          name={review.user.name}
          text={review.text}
          date={review.date}
          userID={review.user._id}
          openModal={openModal}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          tourID={tourID}
          reviewID={review._id}
          toggleReviewUpdate={toggleReviewUpdate}
        />
      );
    })
  );
};

export default CurrentReviews;
