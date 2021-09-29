import { MdDeleteForever } from "react-icons/md";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { NoteContext } from "../../providers/NoteProvider";
import { UserContext } from "../../providers/UserProvider";
import { AiOutlineStar } from "react-icons/ai";

const Note = ({ note }) => {
  let history = useHistory();
  const NoteCtx = useContext(NoteContext);
  const UserCtx = useContext(UserContext);
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
  async function handleFav() {
    let favorites = [];
    await UserCtx.setFavouriteNotes((prev) => {
      if (!!!prev.length) {
        favorites = [note._id];
        return [note._id];
      } else if (prev.includes(note._id)) {
        favorites = prev.filter((fav) => fav !== note._id);
        return favorites;
      } else if (!prev.includes(note._id)) {
        favorites = [note._id, ...prev];
        return favorites;
      }
    });
    fetch(process.env.REACT_APP_SERVER_URL + "/api/users/me/update", {
      method: "PUT",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        favorites: favorites,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        }
      });
  }
  function handleClick(e) {
    NoteCtx.setActiveNote(note);
    history.replace(`/dashboard/notes/${note._id}`);
  }
  function extractContent(s) {
    var span = document.createElement("span");
    span.innerHTML = s;
    if (span.innerText.length > 85)
      return (span.textContent || span.innerText).substring(0, 85) + "...";
    return span.textContent || span.innerText;
  }

  if (note.title.length > 16) note.title = note.title.substring(0, 16) + "...";
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
        <span onClick={handleFav}>
          {UserCtx.favouriteNotes &&
          UserCtx.favouriteNotes.includes(note._id) ? (
            "⭐"
          ) : (
            <AiOutlineStar className="star-card" color="black" size="1.1rem" />
          )}
        </span>
      </div>
    </div>
  );
};

export default Note;
