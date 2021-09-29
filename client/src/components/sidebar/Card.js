import dateformat from "dateformat";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { NoteContext } from "../../providers/NoteProvider";
import { UserContext } from "../../providers/UserProvider";
import { AiOutlineStar } from "react-icons/ai";

function Card({ props }) {
  const { setActiveNote, activeNote } = useContext(NoteContext);
  const UserCtx = useContext(UserContext);
  const updatedAt = dateformat(props.updatedAt, "mmm d, yyyy - h:MM TT");
  let history = useHistory();
  function handleClick() {
    setActiveNote(() => props);
    history.replace(`/dashboard/notes/${props._id}`);
  }
  async function handleFav() {
    let favorites = [];
    await UserCtx.setFavouriteNotes((prev) => {
      if (!!!prev.length) {
        favorites = [props._id];
        return [props._id];
      } else if (prev.includes(props._id)) {
        favorites = prev.filter((fav) => fav !== props._id);
        return favorites;
      } else if (!prev.includes(props._id)) {
        favorites = [props._id, ...prev];
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
  return (
    <div
      className={`dashnote ${props._id === activeNote._id && "active"}`}
      onClick={handleClick}
    >
      <div className="dashnotetitle">
        <h3>{props.title} </h3>
        <div className="fav" onClick={handleFav}>
          {UserCtx.favouriteNotes &&
          UserCtx.favouriteNotes.includes(props._id) ? (
            "⭐"
          ) : (
            <AiOutlineStar color="white" size="0.8rem" />
          )}
        </div>
      </div>
      <p>Last Updated on {updatedAt}</p>
      {/* <div>
          Tags:{" "}
          {props.tags.map((tag, index) => (
            <span key={index}> {tag},</span>
          ))}
        </div> */}
      <hr />
    </div>
  );
}

export default Card;
