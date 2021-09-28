import React from "react";
import { Route } from "react-router-dom";
import TextEditor from "./mainbody/TextEditor";

function MainBody() {
  return (
    <>
      <Route
        path="/Dashboard/notes/:noteid"
        render={(props) => (
          <TextEditor key={props.match.params.parameter} {...props} />
        )}
      />
    </>
  );
}

export default MainBody;
