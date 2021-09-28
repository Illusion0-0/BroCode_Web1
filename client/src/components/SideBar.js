import NotesList from "./sidebar/NotesList";
import TopInfo from "./sidebar/TopInfo";
import React, { useContext, useState } from "react";
import { NoteContext } from "../providers/NoteProvider";
import $ from "jquery";

function SideBar() {
  $(document).ready(function () {
    var menu = $(".navbar");
    var editor = $(".app-main");
    var hamburger = $(".hamburger");
    var ham = $(".hamburger");
    var menuOpen;

    function openMenu() {
      menu.append(
        '<style type="text/css">@media only screen and (min-width: 600px) { .navbar { left:0px}}</style>'
      );
      editor.css("margin-left", "20rem");
      ham.css("display", "none");
      menuOpen = true;
    }

    function closeMenu() {
      menu.append(
        '<style type="text/css">@media only screen and (min-width: 600px) { .navbar { left:-320px}}</style>'
      );

      editor.css("margin-left", "0rem");
      ham.css("display", "block");
      menuOpen = false;
    }

    function toggleMenu() {
      if (menuOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    hamburger.on({
      mouseenter: function () {
        openMenu();
      },
    });

    menu.on({
      mouseleave: function () {
        closeMenu();
      },
    });

    hamburger.on({
      click: function () {
        toggleMenu();
      },
    });
  });

  const [searchText, setSearchText] = useState("");
  const { data } = useContext(NoteContext);

  return (
    <div>
      <div className="hamburger" id="hamburger">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <nav className="navbar" id="navbar">
        <TopInfo handleSearchNote={setSearchText} />
        <div className="dashnotes" id="dashnotes">
          <hr />
          {data && (
            <NotesList
              data={data.filter((note) =>
                note.title.toLowerCase().includes(searchText)
              )}
            />
          )}
        </div>
      </nav>
    </div>
  );
}

export default SideBar;
