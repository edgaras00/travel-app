import { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useParams, useNavigate } from "react-router-dom";

import Accordion from "react-bootstrap/Accordion";
import DescriptionCard from "../destinations/DescriptionCard";
import LocationMap from "../destinations/LocationMap";
import TourReviews from "./TourReviews";

import handleErrors from "../../utils/handleErrors";
import errorRedirect from "../../utils/errorRedirect";

import "../../styles/tourDetails.css";

const TourDetails = () => {
  const [tourDetailsData, setTourDetailsData] = useState(null);
  const [reviewUpdate, setReviewUpdate] = useState(false);
  const { tourID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        let url = `https://paradisetravel-api.onrender.com/api/tours/${tourID}`;
        if (process.env.REACT_APP_ENV === "development") {
          url = `/api/tours/${tourID}`;
        }
        const response = await fetch(url);

        if (response.status !== 200) {
          handleErrors(response.status);
        }

        const data = await response.json();
        setTourDetailsData(data.data.tour);
      } catch (error) {
        console.log(error);
        errorRedirect(error.message, navigate);
      }
    };
    fetchTourDetails();
  }, [tourID, reviewUpdate, navigate]);

  const toggleReviewUpdate = () => {
    setReviewUpdate((prev) => !prev);
  };

  let images = [];
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
            <span className="itinerary-header">
              {tourDetailsData.itineraries[day].title}
            </span>
          </Accordion.Header>
          <Accordion.Body>
            {tourDetailsData.itineraries[day].description}
          </Accordion.Body>
        </Accordion.Item>
      );
    });

    if (tourDetailsData.images.length > 0) {
      images = tourDetailsData.images.map((imageURL) => (
        <img src={imageURL} alt="tour" key={imageURL} />
      ));
    }
  }

  let mapZoom = 6;
  if (tourID === "pandas-and-palaces") {
    mapZoom = 4;
  } else if (
    tourID === "felucca-odyssey" ||
    tourID === "6-day-group-garden-route-and-addo-adventure-tour"
  ) {
    mapZoom = 5;
  }

  return (
    <div className="tour-details">
      <div className="tour-description">
        <DescriptionCard
          image={tourDetailsData ? tourDetailsData.coverImage : null}
          title={tourDetailsData ? tourDetailsData.name : null}
          text={tourDetailsData ? tourDetailsData.description : null}
          price={tourDetailsData ? tourDetailsData.price : null}
          tourID={tourDetailsData ? tourDetailsData._id : null}
          isTour={true}
        />
      </div>
      <div className="tour-image-wrapper">
        {tourDetailsData && tourDetailsData.images ? (
          <div className="tour-images">
            <Carousel showStatus={false} dynamicHeight={false}>
              {images}
            </Carousel>
          </div>
        ) : null}
      </div>
      <div className="tour-map">
        <h2>Locations</h2>
        <LocationMap
          center={tourDetailsData ? center : ["", ""]}
          coordinates={tourDetailsData ? coordinates : null}
          zoom={mapZoom}
        />
      </div>
      <div className="itinerary">
        <h2>Itinerary</h2>
        <div className="itinerary-description-wrapper">
          <p>{tourDetailsData ? tourDetailsData.itineraryDescription : ""}</p>
        </div>
        <Accordion className="itinerary-accordion">{itinerary}</Accordion>
      </div>
      <div className="reviews">
        <TourReviews
          reviewData={tourDetailsData ? tourDetailsData.reviews : []}
          averageRating={tourDetailsData ? tourDetailsData.averageRating : 0}
          tourID={tourDetailsData ? tourDetailsData._id : null}
          toggleReviewUpdate={toggleReviewUpdate}
        />
      </div>
    </div>
  );
};

export default TourDetails;
