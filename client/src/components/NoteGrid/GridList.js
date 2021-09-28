import React, { useContext } from "react";
import AddNoteCard from "./AddNoteCard";
import Note from "./Note";
import { NoteContext } from "../../providers/NoteProvider";

function GridList() {
  const { data } = useContext(NoteContext);
  return (
    <div className="container">
      <div className="menu">
        <div className="dashtitle">Welcome to NodeDown!</div>
        <div className="Notelist">
          <AddNoteCard />
          {data ? data.map((note) => <Note note={note} key={note._id} />) : ""}
        </div>
      </div>
    </div>
  );
}

export default GridList;
