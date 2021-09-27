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
          <Route path="/">
            {isLoggedIn && <Dashboard />}
            {!isLoggedIn && <Redirect to="/auth" />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
