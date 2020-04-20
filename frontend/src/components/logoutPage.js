import React, { useState, useEffect } from "react";
import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import PersistentDrawerLeft from "./searchHeader.js";
import queryString from "query-string";

const styleMessage = {
  width: "38ch",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
};

const styleButton = {
  display: "inline-block",
  marginRight: "20px",
};

export default function LogoutPage() {
  const { userId } = queryString.parse(window.location.search); // extract userId
  let temp = "";
  const [userType, setUsertype] = useState(0);
  // eslint-disable-next-line
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const p2 = "https://elsabor-cors.herokuapp.com/";

  // determine user type
  const userTypeHandler = () => {
    fetch(p2 + "https://elsabor.herokuapp.com/users/getUserType", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `userid=${userId}`,
    })
      .then((response) => {
        console.log(`Status code ${response.status}`);
        response.text().then((result) => {
          console.log(result);

          // eslint-disable-next-line
          if (parseInt(result) === 1) {
            console.log("user is a manager");
            setUsertype(1);
          } else {
            console.log("user is a regular user ");
            setUsertype(0);
          }
        });
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  useEffect(() => {
    userTypeHandler();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <PersistentDrawerLeft />
      <div style={styleMessage}>
        <Typography variant="h4">Do you want to logout of el sabor?</Typography>
        <Typography variant="h6">
          If you logout, you will not be able to see new deals from the
          restaurants you love
        </Typography>
        <div>
          <Link to={"/login"}>
            <Button variant="contained" color="secondary" style={styleButton}>
              logout
            </Button>
          </Link>
          {userType === 0 ? (
            <Link to={`/dashboard?userId=${userId}`}>
              <Button variant="contained" style={styleButton}>
                cancel
              </Button>
            </Link>
          ) : (
            <Link to={`/managerDashboard?userId=${userId}`}>
              <Button variant="contained" style={styleButton}>
                cancel
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
