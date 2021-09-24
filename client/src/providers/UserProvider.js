import React, { useState, useEffect, createContext } from "react";
import { auth } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const UserContext = createContext({ user: null });

export default function UserProvider(props) {
  const [user2, loading, error] = useAuthState(auth);
  const [user, setuser] = useState(user2);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { displayName, email, photoURL } = user;
        setuser({
          displayName,
          email,
          photoURL,
        });
      } else {
        setuser(null);
      }
    });
  }, []);
  if (loading) return <div>loading...</div>;
  if (error) return <div>Unable to Log In</div>;

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}
