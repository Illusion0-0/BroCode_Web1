import dateformat from "dateformat";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { NoteContext } from "../../providers/NoteProvider";
function Card({ props }) {
  const { setActiveNote } = useContext(NoteContext);
  const updatedAt = dateformat(props.updatedAt, "mmm d, yyyy - h:MM TT");
  function handleClick() {
    setActiveNote(props._id);
  }
  return (
    <div>
      <Link to={"/notes/" + props._id} onClick={handleClick}>
        <div>{props.title}</div>
        <div>Last Updated on {updatedAt}</div>
        <div>
          Tags:{" "}
          {props.tags.map((tag, index) => (
            <span key={index}> {tag},</span>
          ))}
        </div>
      </Link>
    </div>
  );
}

export default Card;
