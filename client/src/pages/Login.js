import React, { useEffect, useContext, useState } from "react";
import { signInWithGoogle } from "../services/firebase";
import { UserContext } from "../providers/UserProvider";
import { Redirect } from "react-router-dom";
export default function Login() {
  const user = useContext(UserContext);
  const [redirect, setredirect] = useState(null);
  useEffect(() => {
    if (user) {
      console.log("Redirecting from Login Page to Dashboard...");
      setredirect("/dashboard");
    }
  }, [user]);
  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return (
    <div className="login-buttons">
      <button className="login-provider-button" onClick={signInWithGoogle}>
        <span> Continue with Google</span>
      </button>
    </div>
  );
}
