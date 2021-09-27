import React, { useState, useEffect, createContext } from "react";
export const UserContext = createContext({
  token: "",
  isLoggedIn: false,
  user: {},
  setUser: () => {},
  login: (token) => {},
  logout: () => {},
});

export default function UserProvider(props) {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState({});
  const userIsLoggedIn = !!token; // !!token === true or false
  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  const logoutHandler = () => {
    setToken("");
    localStorage.setItem("token", "");
  };

  const contextValue = {
    token,
    user,
    setUser,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_URL + "/api/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": contextValue.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        contextValue.setUser(data);
      });
  }, []);

  // const [user2, loading, error] = useAuthState(auth);
  // const [user, setuser] = useState(user2);
  // useEffect(() => {
  //   auth.onAuthStateChanged(async (user) => {
  //     if (user) {
  //       const { displayName, email, photoURL } = user;
  //       setuser({
  //         displayName,
  //         email,
  //         photoURL,
  //       });
  //     } else {
  //       setuser(null);
  //     }
  //   });
  // }, []);
  // if (loading) return <div>loading...</div>;
  // if (error) return <div>Unable to Log In</div>;

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
}
