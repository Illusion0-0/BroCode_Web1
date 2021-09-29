import React, { useContext } from "react";
import AddNoteCard from "./AddNoteCard";
import Note from "./Note";
import { NoteContext } from "../../providers/NoteProvider";
import LogOut from "../sidebar/LogOut";

function GridList() {
  const { data, setNotes } = useContext(NoteContext);
  if (!data) {
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
  }
  return (
    <div className="container">
      <div className="menu">
        <div className="dashtitle">
          <div className="welcome"> Welcome to NodeDown!</div>
          <LogOut />
        </div>
        <div className="Notelist">
          <AddNoteCard />
          {data ? data.map((note) => <Note note={note} key={note._id} />) : ""}
        </div>
      </div>
    </div>
  );
}

export default GridList;
