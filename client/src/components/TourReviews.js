import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import CurrentReviews from "./CurrentReviews";
// import ReviewCard from "./ReviewCard";
import ReviewOverall from "./ReviewOverall";
import { AppContext } from "../context/appContext";
import "../styles/tourReviews.css";

const TourReviews = ({
  reviewData,
  averageRating,
  tourID,
  toggleReviewUpdate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReviews, setCurrentReviews] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [reviewOffset, setReviewOffset] = useState(0);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const itemsPerPage = 1;

  //  let reviewCards = [];
  //  if (reviewData) {
  //    reviewCards = reviewData.map((review, index) => {
  //      return (
  //        <ReviewCard
  //          key={index}
  //          rating={review.rating}
  //          header={review.header}
  //          name={review.user.name}
  //          text={review.text}
  //          date={review.date}
  //          userID={review.user._id}
  //          openModal={openModal}
  //          isModalOpen={isModalOpen}
  //          closeModal={closeModal}
  //          tourID={tourID}
  //          reviewID={review._id}
  //          toggleReviewUpdate={toggleReviewUpdate}
  //        />
  //      );
  //    });
  //  }

  useEffect(() => {
    const endOffset = reviewOffset + itemsPerPage;
    setCurrentReviews(reviewData.slice(reviewOffset, endOffset));
    setPageCount(Math.ceil(reviewData.length / itemsPerPage));
  }, [reviewOffset, itemsPerPage, reviewData]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % reviewData.length;
    setReviewOffset(newOffset);
  };

  const openModal = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

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
          toggleReviewUpdate={toggleReviewUpdate}
        />
      </div>
      {/* <div className="review-cards">{reviewCards}</div> */}
      <div className="review-cards">
        <CurrentReviews
          currentReviews={currentReviews}
          openModal={openModal}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          tourID={tourID}
          toggleReviewUpdate={toggleReviewUpdate}
        />
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName="pagination-container"
        breakClassName="pagination-break"
        pageClassName="pagination-page"
        pageLinkClassName="pagination-link"
        activeClassName="active-page"
        activeLinkClassName="active-page-link"
        previousClassName="previous"
        nextClassName="next"
        previousLinkClassName="previous-link"
        nextLinkClassName="next-link"
      />
    </div>
  );
};

export default TourReviews;
