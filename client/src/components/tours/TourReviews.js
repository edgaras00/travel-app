import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import ReactPaginate from "react-paginate";
import CurrentReviews from "./CurrentReviews";
import ReviewOverall from "./ReviewOverall";

import { AppContext } from "../../context/appContext";
import "../../styles/tourReviews.css";

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

  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = reviewOffset + itemsPerPage;

    let reviewDisplay = [...reviewData];
    if (user) {
      const userReview = reviewDisplay.filter(
        (review) => review.user._id === user.id
      )[0];
      if (userReview) {
        const otherReviews = reviewDisplay.filter(
          (review) => review.user._id !== user.id
        );
        reviewDisplay = [userReview, ...otherReviews];
      }
    }
    setCurrentReviews(reviewDisplay.slice(reviewOffset, endOffset));
    setPageCount(Math.ceil(reviewDisplay.length / itemsPerPage));
  }, [reviewOffset, itemsPerPage, reviewData, user]);

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
      <div className="pagination-wrapper">
        {pageCount <= 1 ? null : (
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
        )}
      </div>
    </div>
  );
};

export default TourReviews;
