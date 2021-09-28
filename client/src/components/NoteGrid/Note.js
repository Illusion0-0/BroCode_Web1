import { MdDeleteForever } from "react-icons/md";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { NoteContext } from "../../providers/NoteProvider";

const Note = ({ note }) => {
  let history = useHistory();
  const NoteCtx = useContext(NoteContext);
  function handleDel(note) {
    fetch(process.env.REACT_APP_SERVER_URL + "/api/notes/" + note._id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        NoteCtx.setNotes((previousNotes) =>
          previousNotes.filter((prevnote) => note._id !== prevnote._id)
        );
      })
      .catch((err) => console.log(err));
  }

  function handleClick(e) {
    NoteCtx.setActiveNote(note);
    history.replace(`/dashboard/notes/${note._id}`);
  }
  function extractContent(s) {
    var span = document.createElement("span");
    span.innerHTML = s;
    return span.textContent || span.innerText;
  }
  return (
    <div className="note">
      <div onClick={handleClick}>
        <span>{note.title}</span>
        <p className="noteContent">{extractContent(note.content)}</p>
      </div>
      <div className="note-footer">
        <small>{note.modified}</small>
        <MdDeleteForever
          onClick={() => handleDel(note)}
          className="deleteNote"
          size="1.3em"
          color="red"
        />
      </div>
    </div>
  );
};

export default Note;
