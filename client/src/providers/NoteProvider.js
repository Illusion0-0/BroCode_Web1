import React, { createContext, useEffect, useState } from "react";
// import { API_DUMMY_DATA } from "../Dummy_API/ApiData"; //Dummy API for testing

export const NoteContext = createContext();

export default function NoteProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_URL + "/api/notes", {
      headers: {
        method: "GET",
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      response.json().then((data) => {
        setNotes(data.notes);
      });
    });
  }, []);
  const manageNote = {
    data: notes,
    activeNote,
    setActiveNote,
    setNotes,
  };

  return (
    <NoteContext.Provider value={manageNote}>{children}</NoteContext.Provider>
  );
}
