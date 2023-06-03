import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/appContext";

import OrderCard from "./OrderCard";

import "../../styles/orders.css";

const Orders = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(appContext);

  useEffect(() => {
    const getBookings = async () => {
      try {
        setIsLoading(true);
        let url = "https://paradisetravel.onrender.com/api/bookings/user";
        if (process.env.REACT_APP_ENV === "development") {
          url = "/api/bookings/user";
        }
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        setBookings(data.data.bookings);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getBookings();
  }, []);

  let bookingCards = [];
  if (bookings.length > 0) {
    bookingCards = bookings.map((booking, index) => (
      <OrderCard
        key={index + booking.date}
        name={booking.tour.name}
        price={booking.tour.price}
        image={booking.tour.coverImage}
        date={booking.date}
        tourSlug={booking.tour.slug}
      />
    ));
  }

  return (
    <div className="user-orders">
      {isLoading ? (
        <div className="orders-content loading">
          <h2>Loading...</h2>
        </div>
      ) : (
        <div className="orders-content">
          <div className="orders-header">
            <h2>{bookings.length > 0 ? "Orders" : "You Have No Bookings!"}</h2>
          </div>
          <div className="orders-container">
            {bookings.length > 0 ? (
              bookingCards
            ) : (
              <div className="no-orders">
                <Link to="/tours" className="check-tours">
                  <h3>Check Out Our Tours!</h3>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
