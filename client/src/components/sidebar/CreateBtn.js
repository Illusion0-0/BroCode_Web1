/* function used to create a note */
import { useContext } from "react";
import { NoteContext } from "../../providers/NoteProvider";

function CreateBtn() {
  const NoteCtx = useContext(NoteContext);
  function handleClick(e) {
    e.preventDefault();
    const note = {};
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
        console.log(data);
        NoteCtx.data.push(data);
        console.log(NoteCtx);
        window.location.href = `/notes/${data._id}`;
      })
      .catch((err) => console.log(err));
  }

  return <button onClick={handleClick}>Creat New Note +</button>;
}

export default CreateBtn;
