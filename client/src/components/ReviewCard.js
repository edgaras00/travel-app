import React from "react";
import Rating from "@mui/material/Rating";
import "../styles/reviewCard.css";

const ReviewCard = ({ rating, header, text, name }) => {
  return (
    <div className="review-card">
      <div className="review-user">{name}</div>
      <div className="rating-wrapper">
        <div className="user-rating">
          <Rating value={rating} readOnly />
        </div>
        <div className="review-header">{header}</div>
      </div>
      <div>{text}</div>
    </div>
  );
};

export default ReviewCard;
