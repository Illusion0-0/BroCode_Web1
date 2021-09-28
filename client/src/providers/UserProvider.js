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
  const [favouriteNotes, setFavouriteNotes] = useState([]);
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

  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const darkMode = JSON.parse(localStorage.getItem(`theme-mode`));

    if (darkMode) {
      setDarkMode(darkMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(`theme-mode`, JSON.stringify(darkMode));
  }, [darkMode]);

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
        setFavouriteNotes(data.favorites);
      });
  }, [token]);

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
        setFavouriteNotes(data.favorites);
      });
  }, []);

  const contextValue = {
    token,
    user,
    setUser,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    darkMode,
    setDarkMode,
    favouriteNotes,
    setFavouriteNotes,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
}
