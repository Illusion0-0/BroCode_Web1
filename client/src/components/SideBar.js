import NotesList from "./sidebar/NotesList";
import TopInfo from "./sidebar/TopInfo";
import React from "react";
function SideBar() {
  return (
    <div>
      <div>SideBar</div>
      <TopInfo />
      <NotesList />
    </div>
  );
}

export default SideBar;
