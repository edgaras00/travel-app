import "../../styles/destinationGlance.css";

const DestinationGlance = ({
  name,
  currency,
  language,
  weather,
  bestTimeToVisit,
}) => {
  return (
    <div className="glance-text-wrapper">
      <div className="header-wrapper">
        <h2>{name} at a Glance</h2>
      </div>
      <div className="glance-text">
        <span className="glance-item">Currency:</span> {currency}
      </div>
      <div className="glance-text">
        <span className="glance-item">Language:</span> {language}
      </div>
      <div className="glance-text">
        <span className="glance-item">Weather:</span> {weather}
      </div>
      <div className="glance-text">
        <span className="glance-item">Best Time to Visit:</span>{" "}
        {bestTimeToVisit}
      </div>
    </div>
  );
};

export default DestinationGlance;
