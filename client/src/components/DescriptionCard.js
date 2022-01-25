import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CustomPlanForm from "./CustomPlanForm";
import Button from "./Button";
import { AppContext } from "../context/appContext";
import "../styles/descriptionCard.css";

const DescriptionCard = ({ image, title, text, isTour, price, tourID }) => {
  const { openFormModal, user } = useContext(AppContext);
  const navigate = useNavigate();

  const handleTourBooking = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/book", { state: { name: title, price, tourID } });
  };

  return (
    <div className="description-card">
      <div className="description-card-image">
        <img src={image} alt={title} />
      </div>
      <div className="description-card-text-container">
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="desc-button-container">
          <Button
            size="large"
            text="Start Planning"
            handleClick={isTour ? handleTourBooking : openFormModal}
          />
        </div>
      </div>
      <CustomPlanForm />
    </div>
  );
};

export default DescriptionCard;
