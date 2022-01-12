import React, { useContext } from "react";
import { AppContext } from "../context/appContext";
import CustomPlanForm from "./CustomPlanForm";
import "../styles/descriptionCard.css";

const DescriptionCard = ({ image, title, text }) => {
  const { openFormModal } = useContext(AppContext);
  return (
    <div className="description-card">
      <div className="description-card-image">
        <img src={image} alt={title} />
      </div>
      <div className="description-card-text-container">
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="desc-button-container">
          <button onClick={openFormModal}>Start Planning</button>
        </div>
      </div>
      <CustomPlanForm />
    </div>
  );
};

export default DescriptionCard;
