import React, { createContext, useState, useEffect } from "react";
import { auth } from "./firebase/firebase";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";

export const UserContext = createContext({ user: null });

function UserProvider() {
  const [user, setUser] = useState({ user: null, loggedIn: false });

  const USER_INFO = gql`
    query UserInfo($input: UserInput!) {
      loginQuery(input: $input) {
        id
        userId
        email
        username
        type
        link
      }
    }
  `;

  const [exeUserInfo, { loading, error, data }] = useLazyQuery(USER_INFO);

  if (error) {
    console.log(`Error from userProvider.js ${error.message}`);
  }

  if (data.loginQuery.userId) {
    console.log(`UserId: ${data.loginQuery.userId}`);
    setUser({ ...data.loginQuery, loggedIn: true });
  }

  const authState = async () => {
    await auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        exeUserInfo({ variables: { input: { email: userAuth.email } } });
      } else {
        setUser({ loggedIn: false });
      }
    });
  };

  useEffect(() => {
    const unsubsribe = authState();
    return () => {
      authState();
    };
  });

  return <UserContext.Provider value={user}></UserContext.Provider>;
}

export default UserProvider;
