import React, { createContext, useEffect, useState } from "react";
// import { API_DUMMY_DATA } from "../Dummy_API/ApiData"; //Dummy API for testing

export const NoteContext = createContext();

export default function NoteProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [, setActiveNote] = useState(null);
  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_URL + "/api/notes", {
      headers: {
        method: "GET",
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      response.json().then((data) => {
        setNotes(data);
      });
    });
  }, []);
  // useEffect(() => {
  //   setNotes(() => {
  //     return [...API_DUMMY_DATA];
  //   });
  // }, []);
  // function addNote(note) {
  //   setNotes((previousNotes) => {
  //     return [...previousNotes, ...note]; //adds note obj
  //   });
  // }
  // function removeNote(noteid) {
  //   setNotes((previousNotes) => {
  //     return previousNotes.filter((note) => note._id !== noteid); //remove note obj
  //   });
  // }
  const manageNote = {
    data: notes,
    activeNote: "",
    setActiveNote,
    // add: addNote,
    // remove: removeNote,
  };

  return (
    <NoteContext.Provider value={manageNote}>{children}</NoteContext.Provider>
  );
}
