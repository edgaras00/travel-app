import React, { useContext, useState } from "react";
import Rating from "@mui/material/Rating";
import ReviewModal from "./ReviewModal";
import { AppContext } from "../context/appContext";
import "../styles/reviewCard.css";

const ReviewCard = ({ rating, header, text, name, userID, tourID }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { user } = useContext(AppContext);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className="review-card">
      <ReviewModal
        isModalOpen={isEditModalOpen}
        closeModal={closeEditModal}
        tourID={tourID}
        text={text}
        prevHeader={header}
        prevRating={rating}
        isEdit={true}
      />
      <div className="review-user">
        {name}{" "}
        {user && user.id === userID ? (
          <span onClick={openEditModal}>Edit</span>
        ) : null}
      </div>
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
