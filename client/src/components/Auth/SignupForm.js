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
    <div className="register">
      <div className="form-container">
        <form
          spellcheck="false"
          autocomplete="off"
          className="signup-form"
          onSubmit={handleSubmit}
        >
          {error && <p className="error">{error}</p>}
          <div className="form-group">
            {/* <label htmlFor="email">Email</label> */}
            <input
              className="field"
              type="text"
              id="userName"
              placeholder="Username"
              ref={userNameRef}
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="password">Password</label> */}
            <input
              placeholder="Email"
              className="field"
              type="email"
              id="email"
              ref={emailRef}
              autocomplete="off"
            />
          </div>
          <div className="form-group">
            <input
              className="field"
              type="password"
              id="password"
              ref={passwordRef}
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <input
              className="field"
              type="password"
              id="confirmPassword"
              ref={confirmPasswordRef}
              placeholder="Confirm Password"
            />
          </div>

          <input
            className="signup"
            type="submit"
            value={loading ? "Loading..." : "Sign Up"}
            disabled={loading}
          />
        </form>
        <div className="already-user">
          <a href="#" onClick={() => history.replace("/auth")}>
            Already have an account? Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
