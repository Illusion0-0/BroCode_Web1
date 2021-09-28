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
          UserCtx.setUser(data);
          history.replace("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className=" login">
      <div className="form-container">
        <form spellcheck="false" autocomplete="off" onSubmit={handleSubmit}>
          {error && <div className="alert">{error}</div>}
          <div className="form-group">
            {/* <label htmlFor="email">Email</label> */}
            <input
              className="field"
              type="email"
              id="email"
              placeholder="Enter email"
              ref={emailRef}
              autocomplete="off"
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="password">Password</label> */}
            <input
              className="field"
              type="password"
              id="password"
              placeholder="Password"
              ref={passwordRef}
            />
          </div>
          <input
            className="login-btn"
            type="submit"
            value={loading ? "Loading..." : "Login"}
            disabled={loading}
          />
          <div className="formFooter">
            <a className="underlineHover" href="#">
              Forgot Password?
            </a>
            <a
              href="#"
              className="underlineHover"
              onClick={() => history.replace("/auth/signup")}
            >
              Create an Account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
