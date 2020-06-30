import React, { useState, useEffect } from "react";
import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import SearchHeader from "./searchHeader.js";
import queryString from "query-string";
import { auth } from "./../firebase/firebase";
import gql from "graphql-tag";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

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

  // get user info for search hearder
  const USER_INFO = gql`
    query UserInfo($input: UserInput!) {
      user(input: $input) {
        id
        userId
        email
        username
        type
      }
    }
  `;

  const { data, loading, error } = useQuery(USER_INFO, {
    variables: { input: { userId: userId } },
  });

  if (loading) {
    return <p>loading...</p>;
  }

  // callback for when user clicks logout button
  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div>
      <SearchHeader usertype={1} />

      <div style={styleMessage}>
        <Typography variant="h4">Do you want to logout of el sabor?</Typography>
        <Typography variant="h6">
          If you logout, you will not be able to see new deals from the
          restaurants you love
        </Typography>
        <div>
          <Link to={"/login"}>
            <Button
              variant="contained"
              color="secondary"
              style={styleButton}
              onClick={handleLogout}
            >
              logout
            </Button>
          </Link>
          {data.user.type === 0 ? (
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
