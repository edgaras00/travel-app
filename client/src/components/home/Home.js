import Carousel from "react-bootstrap/Carousel";

// Components
import ServiceCard from "./promos/ServiceCard";
import FavoritesCard from "./promos/FavoritesCard";
import OfferCard from "./promos/OfferCard";
import UpdateCard from "./promos/UpdateCard";
import CompanyReviews from "./promos/CompanyReviews";
import Partners from "./promos/Partners";

import reviewData from "../../utils/companyReviewData";

import "../../styles/home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="carousel-container">
        <Carousel fade interval={null}>
          <Carousel.Item>
            <div id="carousel-card-1">
              <div className="carousel-text">
                <div className="upper-text">GET CARRIED AWAY</div>
                <div className="lower-text">
                  EVERYTHING YOU NEED TO EXPERIENCE AN INCREDIBLE GETAWAY.
                </div>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div id="carousel-card-2">
              <div className="carousel-text">
                <div className="upper-text">GET CARRIED AWAY</div>
                <div className="lower-text">
                  EVERYTHING YOU NEED TO EXPERIENCE AN INCREDIBLE GETAWAY.
                </div>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div id="carousel-card-3">
              <div className="carousel-text">
                <div className="upper-text">GET CARRIED AWAY</div>
                <div className="lower-text">
                  EVERYTHING YOU NEED TO EXPERIENCE AN INCREDIBLE GETAWAY.
                </div>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="card-container">
        <ServiceCard
          icon="https://travelappbucket.s3.amazonaws.com/imgs/tour-guide.png"
          title="Guidance"
          text="Expert insight and travel knowledge"
        />
        <ServiceCard
          icon="https://travelappbucket.s3.amazonaws.com/imgs/diamond.png"
          title="Value"
          text="Irressistable rates, offers and benefits"
        />
        <ServiceCard
          icon="https://travelappbucket.s3.amazonaws.com/imgs/peace-of-mind.png"
          title="Peace of Mind"
          text="Reassurance to book with confidence"
        />
        <ServiceCard
          icon="https://travelappbucket.s3.amazonaws.com/imgs/customer.png"
          title="Service"
          text="Beside you every step of the way"
        />
      </div>
      <div className="updates-header">
        <h2>Our Latest Updates</h2>
      </div>
      <div className="update-container">
        <UpdateCard
          image="https://travelappbucket.s3.amazonaws.com/imgs/offer-vacation.jpg"
          text="Get Carried Away"
          buttonText="Book Now"
        />
        <UpdateCard
          image="https://travelappbucket.s3.amazonaws.com/imgs/offer-mountains.jpg"
          text="A World of Adventure Awaits You!"
          buttonText="Book Now"
        />
      </div>
      <div className="offer-container">
        <OfferCard
          reverse={true}
          image="https://travelappbucket.s3.amazonaws.com/imgs/adventure-offer.jpg"
          buttonText="Explore!"
          path="/tours"
          title="Plan Your Next Adventure"
          text="Answer the call of adventure with Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rhoncus odio ac odio condimentum pellentesque. Quisque a pharetra justo. Mauris. Etiam rhoncus odio ac odio condimentum pellentesque."
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
          image="https://travelappbucket.s3.amazonaws.com/imgs/london-2.jpg"
          city="London"
          country="England"
          title="The London Tour"
          travelPackage="Air and Vacation package"
          duration="5 nights"
          path="/tours/london-explorer"
        />
        <FavoritesCard
          image="https://travelappbucket.s3.amazonaws.com/imgs/milan-2.jpg"
          city="Milan"
          country="Italy"
          title="Italy's Greatest Cities"
          travelPackage="Air and Vacation package"
          duration="9 nights"
          path="/tours/9-night-northern-italy’s-highlights-and-cinque-terre"
        />
        <FavoritesCard
          image="https://travelappbucket.s3.amazonaws.com/imgs/japan-2.jpg"
          city="Tokyo"
          country="Japan"
          title="Japan Adventures"
          travelPackage="Air and Vacation package"
          duration="10 nights"
          path="/tours/japan-adventures"
        />
      </div>
      <div className="offer-container">
        <OfferCard
          image="https://travelappbucket.s3.amazonaws.com/imgs/caribbean-offer.jpg"
          buttonText="Start Planning"
          path="/destinations/caribbean"
          title="Caribbean Adventure Awaits"
          text="Turquoise water, brilliant coral reefs, white-sand beaches, and sun-soaked adventures await you in the Caribbean. Taste Creole flavors, delicious BBQ, and the fresh catch of the day. Learn to dance salsa, escape to a pirate cove, or unwind with yoga on the sand."
        />
      </div>
      <div className="company-reviews-home">
        <CompanyReviews companyReviewData={reviewData} />
      </div>
      <div className="partners-home">
        <Partners />
      </div>
    </div>
  );
};

export default Home;
