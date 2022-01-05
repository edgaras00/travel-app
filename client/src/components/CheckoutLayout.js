import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "../styles/checkoutLayout.css";

const CheckoutLayout = () => {
  const stripePromise = loadStripe(
    "pk_test_51KCYHAJMzPsDhgTYFJzgztyGs5zghhAd30HcZxA8sFZ1JbftJgDxULETMSCzvc6dRiqPZmzwOvzmy5VrUhyBRVBB00NkLf5UVh"
  );

  return (
    <div className="checkout-layout">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default CheckoutLayout;
