import Rating from "@mui/material/Rating";
import RatingBreakdown from "./RatingBreakdown";
import ReviewModal from "./ReviewModal";
import Button from "../Button";
import "../../styles/reviewOverall.css";

const ReviewOverall = ({
  averageRating,
  reviewData,
  isModalOpen,
  closeModal,
  openModal,
  tourID,
  toggleReviewUpdate,
}) => {
  const reviewCounts = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  let breakdownElements = [];
  if (reviewData) {
    reviewData.forEach((review) => reviewCounts[review.rating]++);

    breakdownElements = Object.keys(reviewCounts).map((rating, index) => {
      const proportion = (reviewCounts[rating] / reviewData.length) * 100;
      return (
        <RatingBreakdown
          key={index + rating}
          rating={rating}
          count={reviewCounts[rating]}
          proportion={proportion ? proportion : 0}
        />
      );
    });
  }

  return (
    <div className="total-review">
      <ReviewModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        tourID={tourID}
        isEdit={false}
        toggleReviewUpdate={toggleReviewUpdate}
      />
      <div className="total-review-summary">
        <div className="average-rating">
          {averageRating ? averageRating.toFixed(1) : null}
        </div>
        <div className="rating-star-container">
          <Rating value={averageRating} readOnly size="large" precision={0.5} />
        </div>
        <div className="number-reviews">
          {reviewData ? reviewData.length : null} traveler reviews
        </div>
        <div className="review-button-container">
          <Button text="Write a Review" size="medium" handleClick={openModal} />
        </div>
      </div>
      <div className="total-review-breakdown">{breakdownElements}</div>
      <div className="review-button-container-responsive">
        <Button text="Write a Review" size="medium" handleClick={openModal} />
      </div>
    </div>
  );
};

export default ReviewOverall;
