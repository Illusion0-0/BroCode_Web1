import React, { useContext } from "react";
import GridList from "../components/NoteGrid/GridList";
import { UserContext } from "../providers/UserProvider";

function NoteGrid() {
  const { darkMode } = useContext(UserContext);
  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="back">
        <GridList />
      </div>
    </div>
  );
}

export default NoteGrid;
