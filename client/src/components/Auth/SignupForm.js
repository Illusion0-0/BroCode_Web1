import React, { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";

function SignupForm() {
  const UserCtx = useContext(UserContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    fetch(process.env.REACT_APP_SERVER_URL + "/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current.value,
        username: userNameRef.current.value,
        password: passwordRef.current.value,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (data.error) {
          setError(data.error);
          setLoading(false);
        } else {
          UserCtx.login(data.token);
          history.replace("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="userName">User Name</label>
          <input type="text" id="userName" ref={userNameRef} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailRef} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordRef} />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            ref={confirmPasswordRef}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <button onClick={() => history.replace("/auth")}>
        Already have an account? Login
      </button>
    </div>
  );
}

export default SignupForm;
