/* function used to create a note */
import { useContext } from "react";
import { NoteContext } from "../../providers/NoteProvider";
import { useHistory } from "react-router-dom";

function CreateBtn() {
  const NoteCtx = useContext(NoteContext);

  let history = useHistory();
  function handleClick(e) {
    e.preventDefault();
    const title = prompt("Enter a title for your note");
    const note = {
      title,
      content: "",
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
        NoteCtx.setNotes((prev) => [data, ...prev]);
        NoteCtx.setActiveNote(data);
        history.replace(`/dashboard/notes/${data._id}`);
      })
      .catch((err) => console.log(err));
  }
  return (
    <button className="add-note" onClick={handleClick}>
      <span>📝</span>
    </button>
  );
}

export default CreateBtn;
