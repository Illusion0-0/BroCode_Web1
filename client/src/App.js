import React, { useContext } from "react";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import { UserContext } from "./providers/UserProvider";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./css/App.css";
import NoteGrid from "./pages/NoteGrid";
import { FaRegMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";

function App() {
  const UserCtx = useContext(UserContext);

  const isLoggedIn = UserCtx.isLoggedIn;

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/auth">
            {!isLoggedIn && <AuthPage />}
            {isLoggedIn && <Redirect to="/" />}
          </Route>
          <Route path="/Dashboard">
            {isLoggedIn && <Dashboard />}
            {!isLoggedIn && <Redirect to="/auth" />}
          </Route>
          <Route path="/">
            {isLoggedIn && <NoteGrid />}
            {!isLoggedIn && <Redirect to="/auth" />}
          </Route>
        </Switch>

        <div className={`${UserCtx.darkMode && "dark-mode"}`}>
          <div className="float" title="Toggle theme-mode">
            <button
              onClick={() =>
                UserCtx.setDarkMode((previousDarkMode) => !previousDarkMode)
              }
            >
              <i>
                {" "}
                {UserCtx.darkMode ? (
                  <FiSun color="black" size="1.5rem" />
                ) : (
                  <FaRegMoon color="white" size="1.5rem" />
                )}
              </i>
            </button>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
