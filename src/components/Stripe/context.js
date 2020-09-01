import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import TenentPage from "../Tenent";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe("pk_test_lXSICnUcOdiKH1MCCZnWzGAv00e00SU9qn");

const StripeContext = React.createContext(null);

export const withStripe = Component => props => (
  <Elements stripe={promise}>
  <StripeContext.Consumer>
    {promise => <Component {...props} stripe={promise} />}
  </StripeContext.Consumer>
  </Elements>
);

export default StripeContext;