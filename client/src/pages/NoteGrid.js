import React from "react";
import GridList from "../components/NoteGrid/GridList";

function NoteGrid({ handleAddNewNoteCard, darkMode, handleDelNote }) {
  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <GridList
        handleDelNote={handleDelNote}
        handleAddNewNoteCard={handleAddNewNoteCard}
      />
    </div>
  );
}

export default NoteGrid;
