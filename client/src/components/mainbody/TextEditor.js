import React, { useEffect, useState, useContext } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import ImageInsert from "@ckeditor/ckeditor5-image/src/imageinsert";
import { NoteContext } from "../../providers/NoteProvider";
import { UserContext } from "../../providers/UserProvider";

function TextEditor(props) {
  const [data, setData] = React.useState("");
  let [noteEditor, setNoteEditor] = useState(null);
  const NoteCtx = useContext(NoteContext);
  const UserCtx = useContext(UserContext);
  useEffect(() => {
    const noteid = props.match.params.noteid;
    NoteCtx.setActiveNote(noteid);

    fetch(process.env.REACT_APP_SERVER_URL + "/api/notes/" + noteid, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const [text] = data.note;
          setData(text);
          NoteCtx.setActiveNote(text);
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
  function changeTitle(event) {
    //replace current title with input feild having same value and on enter save and replace title with input feild value
    const newInput = document.createElement("input");
    if (event.target.childNodes[0] === undefined) {
      return;
    }
    newInput.value = event.target.childNodes[0].data;
    event.target.replaceChild(newInput, event.target.childNodes[0]);
    newInput.focus();

    //one enter or one clicking outside of input feild
    ["keydown", "blur"].forEach((evt) =>
      newInput.addEventListener(evt, (e) => {
        if (evt == "blur") {
          const noteid = props.match.params.noteid;
          fetch(process.env.REACT_APP_SERVER_URL + "/api/notes/" + noteid, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({
              title: newInput.value,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                alert(data.error);
              } else {
                //replace input feild back to title
                NoteCtx.setNotes((prevNotes) => {
                  const newNotes = prevNotes.map((note) => {
                    if (note._id === data.note) {
                      note.title = newInput.value;
                    }
                    return note;
                  });
                  return newNotes;
                });
                const newTitle = document.createElement("span");
                newTitle.innerHTML = newInput.value;
                event.target.replaceChild(newTitle, newInput);
              }
            });
        }
      })
    );
  }
  const title = (
    <span>
      <input
        type="text"
        value="${data.title}"
        className="titleInput"
        style={{ display: "none" }}
      />
      <span id="title" onClick={changeTitle}>
        {data.title}
      </span>
    </span>
  );
  const noteHeader = (
    <div className="note-header">
      {`${UserCtx.user.username} / `}
      {title}
      <button onClick={saveNote}>Save</button>
    </div>
  );
  //get all toolbar buttons
  // console.log(ClassicEditor.defaultConfig.plugins.items);
  return (
    <div className="app-main" id="app-main">
      {noteHeader}
      <CKEditor
        editor={ClassicEditor}
        config={
          {
            // extraPlugins: [ImageInsert],
            // toolbar: [
            //   ...ClassicEditor.defaultConfig.toolbar.items,
            //   "insertImage",
            // ],
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
    </div>
  );
}

export default TextEditor;
