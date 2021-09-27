import Card from "./Card";
import React, { useContext } from "react";
import { NoteContext } from "../../providers/NoteProvider";

function NotesList() {
  const { data } = useContext(NoteContext);
  return (
    <div>
      {data.notes
        ? data.notes.map((note) => <Card key={note._id} props={note} />)
        : ""}
    </div>
  );
}

export default NotesList;
