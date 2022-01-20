import React, { useState, useContext } from "react";
import Modal from "react-modal";
import Select from "react-select";
import Button from "./Button";
import { AppContext } from "../context/appContext";
import "../styles/customPlanForm.css";

const CustomPlanForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState("");
  const [travelingWithin, setTravelingWithin] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [comments, setComments] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [interests, setInterests] = useState([]);

  const [destinationData, setDestinationData] = useState([]);

  const { isFormModalOpen, closeFormModal } = useContext(AppContext);

  const destinationOptions = destinationData.map((destination) => {
    return { value: destination.name, label: destination.name };
  });

  const timeframeOptions = [
    { value: "0-1 months", label: "0-1 months" },
    { value: "1-3 months", label: "1-3 months" },
    { value: "3-6 months", label: "3-6 months" },
    { value: "6-9 months", label: "6-9 months" },
    { value: "9-12 months", label: "9-12 months" },
    { value: "12+ months", label: "12+ months" },
  ];

  const handleOnAfterOpen = async () => {
    try {
      const response = await fetch("/api/destinations");
      const data = await response.json();
      setDestinationData(data.data.destinations);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDestinationChange = (destination) => {
    setDestination(destination.value);
  };
  const handleTimeframeChange = (travelingWithin) => {
    setTravelingWithin(travelingWithin.value);
  };

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.currentTarget;
    setInterests((prev) =>
      checked ? [...prev, value] : prev.filter((val) => val !== value)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const requestBody = {
        firstName,
        lastName,
        email,
        phone,
        destination,
        travelingWithin,
        numberOfTravelers: travelers,
        comments,
        travelInterests: interests,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      };

      const response = await fetch("/api/custom", requestOptions);
      const data = await response.json();
      console.log(data);
      closeFormModal();
    } catch (error) {
      console.log(error);
    }
  };

  const customStyles = {
    content: {
      width: "68%",
      backgroundColor: "#fff",
      top: "50%",
      left: "50%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      right: "auto",
      borderRadius: 0,
      height: "100vh",
      padding: 0,
    },
  };
  return (
    <Modal
      isOpen={isFormModalOpen}
      onRequestClose={closeFormModal}
      overlayClassName="form-overlay"
      onAfterOpen={handleOnAfterOpen}
      //   className={"custom-form"}
      style={customStyles}
    >
      <div className="custom-plan-form-wrapper">
        <div className="custom-plan-header">
          <div className="custom-header-content">
            <span>Fill out the form below to get in touch with us</span>
            <span onClick={closeFormModal} className="close-form-modal">
              X
            </span>
          </div>
        </div>
        <form className="custom-plan-form" onSubmit={handleSubmit}>
          <div className="plan-intro">
            Paradise Travel is dedicated to helping you get the best value and
            greatest experiences out of any trip. One of our Travel Consultants
            will respond to your enquiry within 48 hours.
          </div>
          <h3 className="plan-header">Start Planning</h3>
          <div className="traveler-info">
            <h4 className="contact-detail-header">Your contact details</h4>
            <div className="contact-inputs">
              <div className="contact-input">
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  placeholder="First Name"
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </div>
              <div className="contact-input">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>
              <div className="contact-input">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="contact-input">
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Phone"
                  maxLength="10"
                />
              </div>
            </div>
          </div>
          <div className="travel-plans">
            <h4>Tell us about your travel plans</h4>
            <div className="dropdowns">
              <Select
                options={destinationOptions}
                onChange={handleDestinationChange}
                placeholder="Destination"
                className="destination-select"
              />
              <Select
                options={timeframeOptions}
                onChange={handleTimeframeChange}
                placeholder="Traveling within"
                className="destination-select"
              />
            </div>
            <input
              type="number"
              name="travelers"
              value={travelers}
              onChange={(event) => setTravelers(event.target.value)}
              placeholder="Travelers"
            />
            <textarea
              name="comments"
              value={comments}
              placeholder="Tell us about your trip. The more info you give the better we can help you!"
              onChange={(event) => setComments(event.target.value)}
            />
          </div>
          <div className="travel-interests">
            <h4 className="interest-header">What are you interested in?</h4>
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                name="isVacationPackage"
                value="vacation-package"
                checked={interests.some((val) => val === "vacation-package")}
                onChange={handleCheckboxChange}
              />
              <label>Vacation package</label>
            </div>
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                value="flight"
                checked={interests.some((val) => val === "flight")}
                onChange={handleCheckboxChange}
              />
              <label>Flight</label>
            </div>
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                value="hotel"
                checked={interests.some((val) => val === "hotel")}
                onChange={handleCheckboxChange}
              />
              <label>Hotel</label>
            </div>
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                value="tour"
                checked={interests.some((val) => val === "tour")}
                onChange={handleCheckboxChange}
              />
              <label>Tour</label>
            </div>
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                value="cruise"
                checked={interests.some((val) => val === "cruise")}
                onChange={handleCheckboxChange}
              />
              <label>Cruise</label>
            </div>
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                value="other"
                checked={interests.some((val) => val === "other")}
                onChange={handleCheckboxChange}
              />
              <label>Other</label>
            </div>
            <div className="checkbox-wrapper subscription-checkbox">
              <input
                type="checkbox"
                name="subscribe"
                checked={subscribe}
                onChange={() => setSubscribe((prev) => !prev)}
              />
              <label>Subscribe to email for exclusive offers</label>
            </div>
          </div>
          <div className="plan-submit-button">
            <Button size="large" text="Submit" />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CustomPlanForm;
