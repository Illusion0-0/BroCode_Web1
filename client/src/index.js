import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./css/index.css";
import UserProvider from "./providers/UserProvider";
import NoteProvider from "./providers/NoteProvider";

ReactDOM.render(
  <UserProvider>
    <NoteProvider>
      <App />
    </NoteProvider>
  </UserProvider>,
  document.getElementById("root")
);
