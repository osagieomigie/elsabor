import React, { useState } from "react";
import { auth } from "./firebase/firebase";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";
import App from "./App";
import { UserContext } from "./userContext.js";

function UserProvider() {
  const [currentUser, setCurrentUser] = useState({
    user: null,
    loggedIn: false,
  });

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

  // if (data.loginQuery.userId) {
  //   console.log(`UserId: ${data.loginQuery.userId}`);
  //   setCurrentUser({ ...data.loginQuery.userId, loggedIn: true });
  // }

  const authState = async () => {
    await auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        exeUserInfo({ variables: { input: { email: userAuth.email } } });
        setCurrentUser({ user: "active", loggedIn: true });
      } else {
        setCurrentUser({ user: null, loggedIn: false });
      }
    });
  };

  // useEffect(() => {
  //   const unsubscribe = () => {
  //     authState();
  //   };
  //   return () => {
  //     unsubscribe();
  //   };
  // });

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <App />
    </UserContext.Provider>
  );
}

export default UserProvider;
