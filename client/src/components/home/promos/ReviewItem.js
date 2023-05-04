import "../../../styles/reviewItem.css";

const ReviewItem = ({ review, author, authorBackground }) => {
  return (
    <blockquote className="review-item">
      {/* // <div className="review-item"> */}
      <div className="review-item-text">
        <p>{review}</p>
      </div>
      <div className="author">
        <span className="author-name">{author}</span> - {authorBackground}
      </div>
      {/* // </div> */}
    </blockquote>
  );
};

export default ReviewItem;
