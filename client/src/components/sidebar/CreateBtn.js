/* function used to create a note */
import { useContext } from "react";
import { NoteContext } from "../../providers/NoteProvider";
import { useHistory } from "react-router-dom";
import { IoCreateOutline } from "react-icons/io5";

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
        if (data.error) {
          alert(data.error);
        } else {
          NoteCtx.setNotes((prev) => [data, ...prev]);
          NoteCtx.setActiveNote(data);
          history.replace(`/dashboard/notes/${data._id}`);
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <button className="add-note" onClick={handleClick}>
      <span>
        {" "}
        <IoCreateOutline color="white" size="1.3em" title="Add Note" />{" "}
      </span>
    </button>
  );
}

export default CreateBtn;
