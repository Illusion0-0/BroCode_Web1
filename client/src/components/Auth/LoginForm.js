import React, { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";

function LoginForm() {
  const history = useHistory();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const UserCtx = useContext(UserContext);
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    fetch(process.env.REACT_APP_SERVER_URL + "/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current.value,
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
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>

        {error && <div className="alert">{error}</div>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            ref={emailRef}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            ref={passwordRef}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      <button onClick={() => history.replace("/auth/signup")}>
        Create an Account
      </button>
    </div>
  );
}

export default LoginForm;
