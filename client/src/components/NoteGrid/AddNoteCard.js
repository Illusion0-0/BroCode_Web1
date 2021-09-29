import React, { useContext } from "react";
import { NoteContext } from "../../providers/NoteProvider";

function AddNoteCard() {
  const NoteCtx = useContext(NoteContext);
  function handleClick(e) {
    e.preventDefault();
    const title = prompt("Enter a title for your Note");
    const note = {
      content: "",
      title: title,
    };
    fetch(process.env.REACT_APP_SERVER_URL + "/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(note),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          NoteCtx.setNotes((previousNotes) => {
            if (previousNotes) return [data, ...previousNotes];
            else return [data];
          });
          NoteCtx.setActiveNote(data);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="note new">
      <button onClick={handleClick}>
        <div className="circle"></div>
      </button>
    </div>
  );
}

export default AddNoteCard;
