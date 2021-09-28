import Card from "./Card";
import React, { useContext } from "react";
import { NoteContext } from "../../providers/NoteProvider";

function NotesList({ data }) {
  return (
    <>
      {data.map((note) => (
        <Card key={note._id} props={note} />
      ))}
    </>
  );
}

export default NotesList;
