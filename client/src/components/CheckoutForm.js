import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "../styles/checkoutForm.css";

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
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const billingDetails = {
      name: `${firstName} ${lastName}`,
      email,
      address: {
        city,
        line1: address,
        state: state,
        postal_code: zip,
      },
    };

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    });

    console.log(paymentMethod);

    if (!error) {
      setIsProcessing(true);
      const { id } = paymentMethod;
      try {
        const requestOptions = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            amount: tourData.price * 100,
            tourID: tourData.tourID,
          }),
        };

        const response = await fetch("/api/bookings/book", requestOptions);
        const data = await response.json();
        if (data) {
          setIsProcessing(false);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
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
      </div>
      <div className="billing-details">
        <div className="input-field">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            name="state"
            placeholder="State"
            value={state}
            onChange={(event) => setState(event.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            type="postal"
            name="zip"
            placeholder="ZIP"
            value={zip}
            onChange={(event) => setZip(event.target.value)}
          />
        </div>
      </div>
      <CardElement className="card-element" options={cardElementOpts} />
      <button
        className="book-button"
        type="submit"
        disabled={!stripe || !elements || isProcessing}
      >
        {isProcessing ? "Processing..." : "Book"}
      </button>
    </form>
  );
};

export default CheckoutForm;
