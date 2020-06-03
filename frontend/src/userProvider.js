import React, { createContext, useState, useEffect } from "react";
import { auth } from "./firebase/firebase";

export const UserContext = createContext({ user: null });

function UserProvider() {
  const [user, setUser] = useState({ user: null, loggedIn: false });

  const authState = () => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        setUser({ user: userAuth, loggedIn: true });
      } else {
        setUser({ loggedIn: false });
      }
    });
  };

  useEffect(() => {
    const unsubsribe = authState();
    return () => {
      unsubsribe();
    };
  });

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}

export default UserProvider;
