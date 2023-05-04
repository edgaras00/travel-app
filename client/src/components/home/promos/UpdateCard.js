import { Link } from "react-router-dom";
import "../../../styles/updateCard.css";

const UpdateCard = ({ image, text, buttonText }) => {
  const backGround = `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(${image})`;

  return (
    <div className="update-card" style={{ backgroundImage: backGround }}>
      <div className="update-card-content">
        <div className="update-card-text">{text}</div>
        <div className="update-button-container">
          <Link to="/tours">
            <button className="update-button">{buttonText}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateCard;
