import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppContext } from "./context/appContext";

// Components

// Home
import Home from "./components/home/Home";
import Navbar from "./components/home/Navbar";
import Footer from "./components/home/Footer";
import Login from "./components/home/Login";
import Signup from "./components/home/Signup";

// Destinations
import DestinationRegions from "./components/destinations/DestinationRegions";
import Destinations from "./components/destinations/Destinations";
import DestinationDetails from "./components/destinations/DestinationDetails";
import LocationDetails from "./components/destinations/LocationDetails";

// Tours
import Tours from "./components/tours/Tours";
import TourDetails from "./components/tours/TourDetails";

// Orders
import CheckoutLayout from "./components/orders/CheckoutLayout";
import Orders from "./components/orders/Orders";

// Errors
import NotFound from "./components/errors/NotFound";
import ServerError from "./components/errors/ServerError";

import "./styles/app.css";

const App = () => {
  const { user } = useContext(AppContext);

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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/book"
          element={user ? <CheckoutLayout /> : <Navigate to="/login" />}
        />
        <Route
          path="/orders"
          element={user ? <Orders /> : <Navigate to="/login" />}
        />
        <Route path="/error" element={<ServerError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
