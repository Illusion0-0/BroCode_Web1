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
          <a href="#">
            <span
              className="float"
              onClick={() =>
                UserCtx.setDarkMode((previousDarkMode) => !previousDarkMode)
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
