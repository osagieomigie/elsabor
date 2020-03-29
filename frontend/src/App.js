import React from "react";
import "./App.css";
import LoginForm from "./components/loginForm.js";
import RegistrationForm from "./components/registrationForm.js";
import DealTile from "./components/dealTile.js";

function App() {
  return (
    <div className="App">
      {/*<LoginForm/>*/}
      {/*<RegistrationForm /> */}
      <DealTile />
    </div>
  );
}

export default App;
