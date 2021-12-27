import React from "react";
import Card from "./Card";
import FavoritesCard from "./FavoritesCard";
import OfferCard from "./OfferCard";
import vacation from "../images/v4.jpg";
import vacation2 from "../images/v5.jpg";
import { Carousel } from "react-responsive-carousel";
import "../styles/home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import guidance from "../images/tour-guide.png";
import value from "../images/diamond.png";
import service from "../images/customer.png";
import peace from "../images/peace-of-mind.png";
import cancun from "../images/cancun.jpg";
import italy from "../images/italy.jpg";
import london from "../images/london.jpg";
import adventure from "../images/adventure.jpg";

const Home = () => {
  return (
    <div>
      <div className="carousel-container">
        <Carousel
          showThumbs={false}
          showStatus={false}
          //   autoPlay={true}
          //   infiniteLoop={true}
          //   interval={2000}
        >
          <div className="carousel-card">
            <img
              src="https://travelappbucket.s3.amazonaws.com/imgs/cropped-japan.jpg"
              alt="vacation"
            />
          </div>
          <div>
            <img
              src="https://travelappbucket.s3.amazonaws.com/imgs/cropped-vacation.jpg"
              alt="vacation"
            />
          </div>
          <div>
            <img
              src="https://travelappbucket.s3.amazonaws.com/imgs/cropped-adventure.jpg"
              alt="vacation"
            />
          </div>
        </Carousel>
      </div>
      <div className="card-container">
        <Card
          icon={guidance}
          title="Guidance"
          text="Expert insight and travel knowledge"
        />
        <Card
          icon={value}
          title="Value"
          text="Irressistable rates, offers and benefits"
        />
        <Card
          icon={peace}
          title="Peace of Mind"
          text="Reassurance to book with confidence"
        />
        <Card
          icon={service}
          title="Service"
          text="Beside you every step of the way"
        />
      </div>
      <div className="favorites-header">
        <h2>Traveler Favorites</h2>
        <p>
          Need help deciding where to go next? Take a look at some of our
          travelers’ recommended vacations and destinations!
        </p>
      </div>
      <div className="traveler-favorites-container">
        <FavoritesCard
          image={cancun}
          city="Cancun"
          country="Mexico"
          hotel="Hyatt Ziva Cancun"
          travelPackage="Air and Vacation package"
          duration="5 nights"
        />
        <FavoritesCard
          image={italy}
          city="Rome"
          country="Italy"
          hotel="Rome Hotel"
          travelPackage="Air and Vacation package"
          duration="10 nights"
        />
        <FavoritesCard
          image={london}
          city="London"
          country="England"
          hotel="London Hotel"
          travelPackage="Air and Vacation package"
          duration="10 nights"
        />
      </div>
      <div className="offer-container">
        <OfferCard
          image={adventure}
          title="Plan Your Next Adventure"
          text="Answer the call of adventure with Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rhoncus odio ac odio condimentum pellentesque. Quisque a pharetra justo. Mauris."
        />
      </div>
    </div>
  );
};

export default Home;
