import LoginForm from "../components/Auth/LoginForm";
import SignupForm from "../components/Auth/SignupForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";

function AuthPage() {
  const { darkMode } = useContext(UserContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/auth/">
          <div className={`${darkMode && "dark-mode"}`}>
            <LoginForm />
          </div>
        </Route>
        <Route exact path="/auth/signup">
          <div className={`${darkMode && "dark-mode"}`}>
            <SignupForm />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default AuthPage;
