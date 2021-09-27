import React from "react";
import { Route } from "react-router-dom";
import TextEditor from "./mainbody/TextEditor";
function MainBody() {
  // const { data } = useContext(NoteContext);
  // const noteId = useParams().noteId;
  return (
    <div>
      <div>Body of Notes</div>
      <h1 className="dashboard-text">Text Editor</h1>
      <Route
        path="/notes/:noteid"
        render={(props) => (
          <TextEditor key={props.match.params.parameter} {...props} />
        )}
      />
    </div>
  );
}

export default MainBody;
