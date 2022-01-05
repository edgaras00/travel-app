import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faHeart } from "@fortawesome/free-solid-svg-icons";
// import { AppContext } from "../context/appContext";
import "../styles/tourCard.css";

const TourCard = ({
  tourID,
  image,
  name,
  location,
  duration,
  price,
  path,
  // totalPrice,
  rating,
}) => {
  // const { addToCart } = useContext(AppContext);

  return (
    <div className="tour-card">
      <div className="tour-card-image">
        <img src={image} alt={name} />
      </div>
      <div className="tour-card-text">
        <div className="tour-card-name">
          <h2>{name}</h2>
        </div>
        <div className="tour-card-location">
          <div>{location}</div>
        </div>
      </div>
      <div className="tour-card-price">
        <div>{duration} days</div>
        <div>
          from {price}
          <sup>*</sup>
        </div>
      </div>
      <div className="tour-card-footer">
        <hr />
        <div className="tour-card-icons">
          <Link to={path}>
            <FontAwesomeIcon icon={faFlag} className="flag-icon" />
          </Link>
          <FontAwesomeIcon
            icon={faHeart}
            className="flag-icon"
            // onClick={() =>
            //   addToCart({ tourID, name, image, price, totalPrice })
            // }
          />
        </div>
      </div>
    </div>
  );
};

export default TourCard;
