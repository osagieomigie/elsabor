import React from "react";
import "./App.css";
import LoginForm from "./components/loginForm.js";
import RegistrationForm from "./components/registrationForm.js";
import Background from "./components/background-red-slash.js";
import UserDashboard from "./components/userDashboard.js";
import Profile from "./components/profile.js";
import ManagerDashboard from "./components/managerDashboard";
import CouponForm from "./components/couponForm.js"
import LandingWriting from './components/landingWriting.js'
import DiscoverDeal from "./components/discoverDeal.js"
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Route
        path="/"
        exact
        render={(props) => <Background comp={<div><LandingWriting /><DiscoverDeal /></div>} />}
        />
        <Route
          path="/login"
          exact
          render={(props) => <Background comp={<LoginForm />} />}
        />
        <Route
          path="/register"
          render={(props) => <Background comp={<RegistrationForm />} />}
        />
        <Route path="/dashboard" component={UserDashboard} />
        <Route path="/managerDashboard" component={ManagerDashboard} />
        <Route path="/addCoupon" component={CouponForm} />
        <Route path="/profile" component={Profile} />
      </div>
    </Router>
  );
}

export default App;
