import React from "react";
import ReviewItem from "./ReviewItem";
import "../styles/companyReviews.css";

const CompanyReviews = ({ companyReviewData }) => {
  const reviewItems = companyReviewData.map((item) => (
    <ReviewItem
      review={item.text}
      author={item.author}
      authorBackground={item.background}
    />
  ));
  return (
    <div className="company-review-container">
      <div className="company-review-header">
        <h2>What Our Partners and Clients Say About Paradise Travel</h2>
      </div>
      <div className="company-reviews">{reviewItems}</div>
    </div>
  );
};

export default CompanyReviews;
