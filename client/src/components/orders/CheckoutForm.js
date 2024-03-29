import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/appContext";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Select from "react-select";
import Button from "../Button";

import statesUS from "../../utils/statesUS";
import countries from "../../utils/countries";

import "../../styles/checkoutForm.css";

const CheckoutForm = ({ tourData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [submitError, setSubmitError] = useState(null);
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  const stateOpts = statesUS.map((opt) => ({
    value: opt,
    label: opt,
  }));

  const countryOpts = countries.map((country) => ({
    value: country,
    label: country,
  }));

  const handleStateChange = (stateOpt) => {
    setState(stateOpt.value);
  };

  const handleCountryChange = (country) => {
    setCountry(country.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError(null);

    if (
      !firstName ||
      !lastName ||
      !email ||
      !address ||
      !city ||
      !state ||
      !country ||
      !zip
    ) {
      setSubmitError("Please fill in all of the fields");
      return;
    }

    if (elements == null) {
      return;
    }

    const billingDetails = {
      name: `${firstName} ${lastName}`,
      email,
      address: {
        city,
        line1: address,
        line2: country,
        state: state,
        postal_code: zip,
      },
    };

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    });

    // console.log(paymentMethod);

    if (!error) {
      setIsProcessing(true);
      const { id } = paymentMethod;
      try {
        const requestOptions = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id,
            amount: tourData.price * 100,
            tourID: tourData.tourID,
            description: tourData.name,
          }),
        };
        let url = "https://paradisetravel-api.onrender.com/api/bookings/book";
        if (process.env.REACT_APP_ENV === "development") {
          url = "/api/bookings/book";
        }
        const response = await fetch(url, requestOptions);

        if (response.status !== 201) {
          throw new Error("Something went wrong. Try again later.");
        }

        const data = await response.json();
        if (data) {
          // console.log(data);
          setIsProcessing(false);
          navigate("/");
        }
      } catch (error) {
        console.error(error);
        setSubmitError(error.message);
        setIsProcessing(false);
        return;
      }
    }
  };

  const cardElementStyle = {
    base: {
      fontSize: "16px",
      "::placeholder": {
        color: "grey",
      },
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE",
    },
    complete: {
      iconColor: "#cbf4c9",
    },
  };

  const cardElementOpts = {
    iconStyle: "solid",
    hidePostalCode: true,
    style: cardElementStyle,
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="checkout-header">
        <h4>Book "{tourData.name}"</h4>
        <h5>Price: ${tourData.price}</h5>
      </div>
      <div className="billing-details">
        <div className="form-line">
          <div className="buyer-info-input">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div className="buyer-info-input">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <div className="buyer-info-input">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>
        <div className="form-line">
          <div className="address-first-input address-line">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>
          <div className="address-first-input">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
          </div>
        </div>
        <div className="form-line">
          <div className="address-second-input">
            <Select
              options={stateOpts}
              onChange={handleStateChange}
              placeholder="State"
              className="us-state-select"
            />
          </div>
          <div className="address-second-input">
            <Select
              options={countryOpts}
              onChange={handleCountryChange}
              placeholder="Country"
              className="country-select"
            />
          </div>
          <div className="address-second-input">
            <input
              className="zip"
              type="text"
              name="zip"
              placeholder="ZIP"
              value={zip}
              onChange={(event) => setZip(event.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="card-element-wrapper">
        <CardElement className="card-element" options={cardElementOpts} />
      </div>
      {submitError ? <div className="submit-error">{submitError}</div> : null}
      <Button
        size="large"
        text={isProcessing ? "Processing..." : "Book"}
        disabled={!stripe || !elements || isProcessing}
      />
    </form>
  );
};

export default CheckoutForm;
