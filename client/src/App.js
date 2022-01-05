import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DestinationRegions from "./components/DestinationRegions";
import Destinations from "./components/Destinations";
import DestinationDetails from "./components/DestinationDetails";
import LocationDetails from "./components/LocationDetails";
import Tours from "./components/Tours";
import TourDetails from "./components/TourDetails";
import Login from "./components/Login";
import Signup from "./components/Signup";

import CheckoutLayout from "./components/CheckoutLayout";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/destinations" element={<DestinationRegions />} />
        <Route path="/destinations/:regionID" element={<Destinations />} />
        <Route
          path="/destinations/:regionID/:destinationID"
          element={<DestinationDetails />}
        />
        <Route
          path="/destinations/:regionID/:destinationID/:locationID"
          element={<LocationDetails />}
        />
        <Route path="/vacations" />
        <Route path="/vacations/:vacationType" />
        <Route path="/vacations/:vacationType/:vacationID" />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/:tourID" element={<TourDetails />} />
        <Route path="/blog" />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/book" element={<CheckoutLayout />} />
        {/* <Route path="/cart" element={<ShoppingCart />} /> */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
