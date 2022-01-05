import React from "react";
import star from "../star.svg";

import "../styles/ratingBreakdown.css";

const RatingBreakdown = ({ rating, count, proportion }) => {
  return (
    <div className="rating-breakdown">
      <div className="value-wrapper">
        <div className="rating-value">
          {rating} <img src={star} alt="star" style={{ width: "15px" }} />
        </div>
        <div className="rating-star">
          <progress max="100" value={proportion}></progress>
          {/* <Rating value={rating * 1} readOnly /> */}
        </div>
      </div>
      <div className="total-ratings">{count}</div>
    </div>
  );
};

export default RatingBreakdown;
