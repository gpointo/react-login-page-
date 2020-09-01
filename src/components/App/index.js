import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import TenentPage from '../Tenent';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe("pk_test_lXSICnUcOdiKH1MCCZnWzGAv00e00SU9qn");
const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.TENENT} 
      render={ (props)=> <Elements stripe={promise}> <TenentPage {...props} /> </Elements> }/>
    </div>
  </Router>
);
require('dotenv').config()
export default withAuthentication(App);
