import React from "react";
import UserProvider from "./userProvider";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./client";

function Main() {
  return (
    <ApolloProvider client={client}>
      <UserProvider />
    </ApolloProvider>
  );
}

export default Main;
