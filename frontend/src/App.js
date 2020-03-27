import React from "react";
import "./App.css";
import LoginForm from "./components/loginForm.js";
import RegistrationForm from "./components/registrationForm.js";

function App() {
  return (
    <div className="App">
      {/*<LoginForm/>*/}
      <RegistrationForm />
    </div>
  );
}

export default App;
