import LoginForm from "../components/Auth/LoginForm";
import SignupForm from "../components/Auth/SignupForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";

function AuthPage() {
  return (
    <Router>
      <Switch>
        <Route exact path="/auth/">
          <LoginForm />
        </Route>
        <Route exact path="/auth/signup">
          <SignupForm />
        </Route>
      </Switch>
    </Router>
  );
}

export default AuthPage;
