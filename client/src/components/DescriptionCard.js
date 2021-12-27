import React from "react";
import "../styles/descriptionCard.css";

const DescriptionCard = ({ image, title, text }) => {
  return (
    <div className="description-card">
      <div className="description-card-image">
        <img src={image} alt={title} />
      </div>
      <div className="description-card-text-container">
        <h2>{title}</h2>
        <p>{text}</p>
        {/* <p>
          Visiting Europe? Welcome to a continent that’s rich in history and
          modern charisma. Whether you’re traveling solo, with family, or
          friends, Europe offers countless opportunities to mesmerize you. With
          easy access to so many diverse countries and cultures, you can wine
          and dine in the hills of Tuscany one day, and dance the Sardana
          through the streets of Barcelona the next. Bathe in the baths of
          Budapest or marvel in the beauty of the Northern Lights in Iceland.
          There are endless experiences, and Paradise Travel has just the right
          vacation packages to make it a trip you’ll never forget.
        </p> */}
      </div>
    </div>
  );
};

export default DescriptionCard;
