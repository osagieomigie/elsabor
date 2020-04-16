import React from "react";
import "./App.css";
import LoginForm from "./components/loginForm.js";
import RegistrationForm from "./components/registrationForm.js";
import Background from "./components/background-red-slash.js";
import UserDashboard from "./components/userDashboard.js";
import Profile from "./components/profile.js";
import ManagerDashboard from "./components/managerDashboard";
import AddCoupon from "./components/addCoupon.js";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Route
          path="/"
          exact
          render={(props) => <Background comp={<LoginForm />} />}
        />
        <Route
          path="/register"
          render={(props) => <Background comp={<RegistrationForm />} />}
        />
        <Route path="/dashboard" component={UserDashboard} />
        <Route path="/managerDashboard" component={ManagerDashboard} />
        <Route path="/addCoupon" component={AddCoupon} />
        <Route path="/profile" component={Profile} />
      </div>
    </Router>
  );
}

export default App;
