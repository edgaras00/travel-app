import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OrderCard from "./OrderCard";
import "../styles/orders.css";

const Orders = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await fetch("/api/bookings/user");
        const data = await response.json();
        setBookings(data.data.bookings);
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

  console.log(bookings);

  return (
    <div className="user-orders">
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
    </div>
  );
};

export default Orders;
