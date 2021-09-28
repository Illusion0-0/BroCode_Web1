import Card from "./Card";
import React from "react";

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
