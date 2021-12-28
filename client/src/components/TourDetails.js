import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DescriptionCard from "./DescriptionCard";
import LocationMap from "./LocationMap";
import Accordion from "react-bootstrap/Accordion";

const TourDetails = () => {
  const [tourDetailsData, setTourDetailsData] = useState(null);
  const { tourID } = useParams();

  useEffect(() => {
    const fetchTourDetails = async () => {
      const response = await fetch(`http://localhost:5000/api/tours/${tourID}`);
      const data = await response.json();
      setTourDetailsData(data.data.tour);
    };
    fetchTourDetails();
  }, [tourID]);

  let center = [];
  let coordinates = [];
  let itinerary = [];
  if (tourDetailsData) {
    coordinates = tourDetailsData.locations.map((location) => {
      return { name: location.name, coordinates: location.coordinates };
    });
    center = coordinates[0].coordinates;

    itinerary = Object.keys(tourDetailsData.itineraries).map((day, index) => {
      return (
        <Accordion.Item eventKey={index} key={index}>
          <Accordion.Header>
            {tourDetailsData.itineraries[day].title}
          </Accordion.Header>
          <Accordion.Body>
            {tourDetailsData.itineraries[day].description}
          </Accordion.Body>
        </Accordion.Item>
      );
    });
  }

  return (
    <div className="tour-details">
      <div className="tour-description">
        <DescriptionCard
          image={tourDetailsData ? tourDetailsData.coverImage : null}
          title={tourDetailsData ? tourDetailsData.name : null}
          text={tourDetailsData ? tourDetailsData.description : null}
        />
      </div>
      <div className="tour-map">
        <LocationMap
          center={tourDetailsData ? center : ["", ""]}
          coordinates={tourDetailsData ? coordinates : null}
        />
      </div>
      <div className="itinerary">
        <Accordion>{itinerary}</Accordion>
      </div>
      <div className="images"></div>
    </div>
  );
};

export default TourDetails;