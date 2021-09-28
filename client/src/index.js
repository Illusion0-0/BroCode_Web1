import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./css/index.css";
import UserProvider from "./providers/UserProvider";

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById("root")
);
