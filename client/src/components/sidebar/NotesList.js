import Card from "./Card";
import { useContext } from "react";
import { NoteContext } from "../../providers/NoteProvider";

function NotesList() {
  const notes = useContext(NoteContext);
  //   console.log(notes);
  return (
    <div>
      {notes.data
        ? notes.data.map((note) => <Card key={note._id} props={note} />)
        : ""}
    </div>
  );
}

export default NotesList;
