import React from "react";
import "./App.css";
import LoginForm from "./components/loginForm.js";
import RegistrationForm from "./components/registrationForm.js";
import DealTile from "./components/dealTile.js";
import Background from "./components/background-red-slash.js";
import UserDashboard from "./components/userDashboard.js";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Route
          path="/"
          exact
          render={props => <Background comp={<LoginForm />} />}
        />
        <Route
          path="/register"
          render={props => <Background comp={<RegistrationForm />} />}
        />
        <Route path="/deal" component={DealTile} />
        <Route path="/dashboard" component={UserDashboard} />
      </div>
    </Router>
  );
}

export default App;
