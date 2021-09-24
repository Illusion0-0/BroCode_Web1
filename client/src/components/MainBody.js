// import { useContext } from "react";
// import { NoteContext } from "../providers/NoteProvider";
function MainBody() {
  //const notes = useContext(NoteContext);
  return (
    <div>
      <div>Body of Notes</div>
      <h1 className="dashboard-text">{console.log("Rendered MainBody")}</h1>
    </div>
  );
}

export default MainBody;
