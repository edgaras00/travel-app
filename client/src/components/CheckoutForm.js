import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "../styles/checkoutForm.css";

const CheckoutForm = () => {
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
            amount: 100 * 100,
          }),
        };

        const response = await fetch("/api/bookings/book", requestOptions);
        const data = await response.json();
        if (data) {
          console.log(data);
          setIsProcessing(false);
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
        color: "#87bbfd",
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
    <form
      onSubmit={handleSubmit}
      style={{ height: "500px" }}
      className="checkout-form"
    >
      <div className="billing-details">
        <div className="input-field">
          <label>
            <span>First Name</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div className="input-field">
          <label>
            <span>Last Name</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
        <div className="input-field">
          <label>
            <span>Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="input-field">
          <label>
            <span>Address</span>
          </label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <div className="input-field">
          <label>
            <span>City</span>
          </label>
          <input
            type="text"
            name="city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </div>
        <div className="input-field">
          <label>
            <span>State</span>
          </label>
          <input
            type="text"
            name="state"
            value={state}
            onChange={(event) => setState(event.target.value)}
          />
        </div>
        <div className="input-field">
          <label>
            <span>Country</span>
          </label>
          <input
            type="text"
            name="country"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
          />
        </div>
        <div className="input-field">
          <label>
            <span>ZIP</span>
          </label>
          <input
            type="postal"
            name="zip"
            value={zip}
            onChange={(event) => setZip(event.target.value)}
          />
        </div>
      </div>
      <CardElement className="card-element" options={cardElementOpts} />
      <button type="submit" disabled={!stripe || !elements || isProcessing}>
        {isProcessing ? "Processing..." : "Book"}
      </button>
    </form>
  );
};

export default CheckoutForm;
