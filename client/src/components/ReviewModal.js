import React, { useState } from "react";
import Modal from "react-modal";
import Rating from "@mui/material/Rating";
import "../styles/reviewModal.css";

const ReviewModal = ({
  isModalOpen,
  closeModal,
  tourID,
  text,
  prevRating,
  prevHeader,
  isEdit,
  reviewID,
  toggleReviewUpdate,
}) => {
  const [rating, setRating] = useState(prevRating || 5);
  const [reviewHeader, setReviewHeader] = useState(prevHeader || "");
  const [reviewText, setReviewText] = useState(text || "");
  const [submitError, setSubmitError] = useState(null);

  const handleOnAfterClose = () => {
    setSubmitError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!reviewHeader || !reviewText) {
      setSubmitError("Please fill in all of the fields.");
      return;
    }

    try {
      const requestBody = {
        tour: tourID,
        rating,
        header: reviewHeader,
        text: reviewText,
        date: Date.now(),
      };
      const requestOptions = {
        method: isEdit ? "PATCH" : "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      };

      const response = await fetch(
        `/api/reviews/${isEdit ? "update/" + reviewID : ""}`,
        requestOptions
      );
      const data = await response.json();

      if (response.status !== 201) {
        if (
          response.status === 400 &&
          data.message.startsWith("User has already")
        ) {
          throw new Error("Tour already reviewed");
        }
        if (
          response.status === 400 &&
          data.message.startsWith("No tour purchased")
        ) {
          throw new Error("Not purchased");
        }
      }

      console.log(data);
      toggleReviewUpdate();
      closeModal();
    } catch (error) {
      console.log(error);
      if (error.message === "Tour already reviewed") {
        setSubmitError("You have already reviewed this tour.");
        return;
      }
      if (error.message === "Not purchased") {
        setSubmitError(
          "You need to book the tour before being able to review it."
        );
        return;
      }
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "70%",
      borderRadius: "10px",
      padding: 0,
    },
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      onAfterClose={handleOnAfterClose}
      style={customStyles}
    >
      <div className="review-form-wrapper">
        <div className="review-modal-header">
          <span onClick={closeModal}>X</span>
        </div>
        <form className="review-form" onSubmit={handleSubmit}>
          <div className="submit-rating">
            <Rating
              name="tour-rating"
              value={rating}
              size="large"
              onChange={(event, newValue) => setRating(newValue)}
            />
          </div>
          <div className="review-inputs">
            <div className="review-header-input">
              <input
                type="text"
                name="reviewHeader"
                placeholder="Review header"
                value={reviewHeader}
                onChange={(event) => setReviewHeader(event.target.value)}
              />
            </div>
            <div className="review-text-wrapper">
              <textarea
                value={reviewText}
                onChange={(event) => setReviewText(event.target.value)}
                placeholder="Let us know what you think about the tour!"
              />
            </div>
          </div>
          <div className="submit-review-wrapper">
            <button>{isEdit ? "Edit" : "Submit"} Review</button>
            {submitError ? (
              <div className="review-error">{submitError}</div>
            ) : null}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ReviewModal;
