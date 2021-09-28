import React, { useContext, useState, useEffect } from "react";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import { UserContext } from "./providers/UserProvider";
import { NoteContext } from "./providers/NoteProvider";
import { ApiData } from "./Dummy_API/ApiData";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./css/App.css";
import NoteGrid from "./pages/NoteGrid";

function App() {
  const UserCtx = useContext(UserContext);
  // const NoteCtx = useContext(NoteData);
  const [notes, setNotes] = useState(ApiData);

  const isLoggedIn = UserCtx.isLoggedIn;
  const [darkMode, setDarkMode] = useState(false);
  const [activeNote, setActiveNote] = useState(false);
  // useEffect(() => {
  //   const themeMode = JSON.parse(localStorage.getItem(`theme-mode`));
  //   if (themeMode) {
  //     setDarkMode(themeMode);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem(`theme-mode`, JSON.stringify(darkMode));
  // }, [darkMode]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem(`user-notes`));

    if (savedNotes) {
      setNotes(savedNotes);
    }
    const darkMode = JSON.parse(localStorage.getItem(`theme-mode`));

    if (darkMode) {
      setDarkMode(darkMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(`user-notes`, JSON.stringify(notes));
    localStorage.setItem(`theme-mode`, JSON.stringify(darkMode));
  }, [notes, darkMode]);

  const addNewNote = () => {
    const modified = new Date().toLocaleDateString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const newNote = {
      _id: "0",
      title: "Untitled",
      content: "Your note goes here...",
      modified: modified,
    };
    // if (notes !== undefined)
    // else setNotes(newNote);
    setNotes((notes) => [newNote, ...notes]);
    console.log(`Note: ${newNote._id} created`);
  };

  const delNote = (_id) => {
    setNotes(notes.filter((note) => note._id !== _id));
    console.log(`Note: ${_id} deleted`);
  };

  const getActiveNote = () => {
    return notes.find((note) => note._id === activeNote);
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/auth">
            {!isLoggedIn && (
              <AuthPage
                darkMode={darkMode}
                handleToggleDarkMode={setDarkMode}
              />
            )}
            {isLoggedIn && <Redirect to="/" />}
          </Route>
          <Route path="/Dashboard">
            {isLoggedIn && <Dashboard handleAddNewNote={addNewNote} />}
            {!isLoggedIn && <Redirect to="/auth" />}
          </Route>
          <Route path="/">
            {isLoggedIn && (
              <NoteGrid
                handleAddNewNoteCard={addNewNote}
                darkMode={darkMode}
                handleToggleDarkMode={setDarkMode}
                handleDelNote={delNote}
              />
            )}
            {!isLoggedIn && <Redirect to="/auth" />}
          </Route>
        </Switch>
        <div className={`${darkMode && "dark-mode"}`}>
          <a href="#">
            <span
              className="float"
              onClick={() =>
                setDarkMode((previousDarkMode) => !previousDarkMode)
              }
            >
              <i className="moon">🌜</i>
            </span>
          </a>
        </div>
      </div>
    </Router>
  );
}

export default App;
