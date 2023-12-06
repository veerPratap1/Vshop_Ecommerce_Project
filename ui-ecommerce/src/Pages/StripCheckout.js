import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./stripe.css";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/orders/OrderSlice";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51O7wWISAO41M4Qys3SSHbI5IiJzv16EfwdoywZqMzR2G23k9DWVJSwAhMBtcg5PpUtqVR215A0mNImG7HMUhokTb00U6uuTuFm"
);

export default function StripCheckout() {
  const [clientSecret, setClientSecret] = useState("");

  const currentOrder = useSelector(selectCurrentOrder);


  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: currentOrder.totalCost, orderId: currentOrder.id }),
      metaData: { order_id: currentOrder.id },
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [currentOrder]);
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
