import React, { useContext, useRef } from "react";
import { NoteContext } from "../../providers/NoteProvider";
function SearchBar() {
  const notes = useContext(NoteContext);
  const searchRef = useRef();
  const searchHandler = function () {
    if (searchRef.current.value < 3) return;
    notes.add(
      notes.data.filter((note) => {
        return note.title.includes(searchRef.current.value);
      })
    );
  };
  return (
    <input
      type="text"
      placeholder="Search Here..."
      ref={searchRef}
      onChange={searchHandler}
    />
  );
}

export default SearchBar;
