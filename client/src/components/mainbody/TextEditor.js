import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function TextEditor(props) {
  const [data, setData] = React.useState("");
  let [noteEditor, setNoteEditor] = useState(null);
  useEffect(() => {
    const noteid = props.match.params.noteid;

    fetch(process.env.REACT_APP_SERVER_URL + "/api/notes/" + noteid, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.note) {
          const [text] = data.note;
          setData(text);
        }
      });
  }, [props.match.params.noteid]);
  if (!data) return "";
  function saveNote(event) {
    event.preventDefault();
    const noteid = props.match.params.noteid;
    fetch(process.env.REACT_APP_SERVER_URL + "/api/notes/" + noteid, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        content: noteEditor.getData(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Note Saved!");
        }
      });
  }
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        config={
          {
            // toolbar: ["bold", "italic"],
          }
        }
        onReady={(editor) => {
          setNoteEditor(editor);
        }}
        onChange={(event, editor) => {
          noteEditor = editor;
        }}
        data={data.content}
      />
      <button onClick={saveNote}>Save</button>
    </div>
  );
}

export default TextEditor;
