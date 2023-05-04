import "../../../styles/serviceCard.css";

const ServiceCard = ({ icon, title, text }) => {
  return (
    <div className="card">
      <div>
        <img src={icon} alt="card icon" />
      </div>
      <div className="title">{title}</div>
      <div className="text">{text}</div>
    </div>
  );
};

export default ServiceCard;
