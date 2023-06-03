import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/appContext";
import Modal from "react-modal";
import Rating from "@mui/material/Rating";

import Button from "../Button";

import "../../styles/reviewModal.css";

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
  const { token } = useContext(AppContext);

  useEffect(() => {
    setReviewText(text);
    setReviewHeader(prevHeader);
  }, [text, prevHeader]);

  const handleOnAfterClose = () => {
    setSubmitError(null);
    setReviewText(text || "");
    setReviewHeader(prevHeader || "");
    setRating(prevRating || 5);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!reviewHeader || !reviewText || !rating) {
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      };

      let url = `https://paradisetravel-api.onrender.com/api/reviews/${
        isEdit ? "/update/" + reviewID : ""
      }`;
      if (process.env.REACT_APP_ENV === "development") {
        url = `/api/reviews/${isEdit ? "update/" + reviewID : ""}`;
      }
      const response = await fetch(url, requestOptions);

      const data = await response.json();
      if (response.status !== 201 && response.status !== 200) {
        console.log("Hello");
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
        throw new Error("Server error");
      }
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
      if (error.message === "Server error") {
        setSubmitError("Something went wrong. Try again later.");
        return;
      }
    }
  };

  const handleDeleteReview = async (event) => {
    event.preventDefault();
    try {
      let url = `https://paradisetravel-api.onrender.com/api/reviews/remove/${reviewID}`;
      if (process.env.REACT_APP_ENV === "development") {
        url = `/api/reviews/remove/${reviewID}`;
      }
      const response = await fetch(`/api/reviews/remove/${reviewID}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status !== 204) {
        throw new Error("Server error");
      }

      toggleReviewUpdate();
      closeModal();
    } catch (error) {
      console.log(error);
      if (error.message === "Server error") {
        setSubmitError("Something went wrong. Try again later.");
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
                maxLength="100"
                onChange={(event) => setReviewHeader(event.target.value)}
              />
            </div>
            <div className="review-text-wrapper">
              <textarea
                value={reviewText}
                onChange={(event) => setReviewText(event.target.value)}
                placeholder="Let us know what you think about the tour!"
                maxLength="4000"
              />
            </div>
          </div>
          <div className="submit-review-wrapper">
            <Button
              text={`${isEdit ? "Edit" : "Submit"} Review`}
              size="large"
            />
            {isEdit ? (
              <Button
                text="Delete Review"
                size="large"
                className="delete-review"
                handleClick={handleDeleteReview}
              />
            ) : null}
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
