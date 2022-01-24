import React from "react";
import { Link } from "react-router-dom";
import "../styles/orderCard.css";

const OrderCard = ({ name, image, price, date, tourSlug }) => {
  return (
    <div className="order-card">
      <div className="order-image">
        <img src={image} alt={name} />
      </div>
      <div className="order-text-wrapper">
        <div className="order-name">
          <Link to={`/tours/${tourSlug}`}>
            <h4>{name}</h4>
          </Link>
        </div>
        <div className="order-date">Order date: {date.split("T")[0]}</div>
        <div className="order-price">Price: ${price}</div>
      </div>
    </div>
  );
};

export default OrderCard;
