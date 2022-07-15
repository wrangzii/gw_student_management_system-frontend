import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:8080/login",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({ username, password }),
    })
      .then((result) => {
        if (result) {
          cookies.set("token", result.data.data.token);
          cookies.set("userId", result.data.data.id);
          cookies.set("username", result.data.data.username);
          cookies.set("email", result.data.data.email);
          cookies.set("phoneNumber", result.data.data.phoneNumber);
          cookies.set("address", result.data.data.address);
          cookies.set("dob", result.data.data.dob);
          cookies.set("fullName", result.data.data.fullName);
          cookies.set("roles", result.data.data.roles);
          window.location.reload();
        }
      })
      .catch((error) => {
        setIsError(true);
      });
  };

  // Handle login Google
  const handleLoginGoogle = () => {
    const cookieToken = cookies.get("token");
    window.location.replace(
      "http://localhost:8080/oauth2/authorization/google"
    );
    navigate("/oauth2/authorization/google");
    if (cookieToken) {
      setToken(cookieToken);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin} className="form-group">
        <h2 className="form-heading bg-primary text-white text-center">
          WELCOME TO CMS
        </h2>
        <div className="form-body">
          {isError && (
            <small className="text-danger mb-2 d-block">Username or password is incorrect!</small>
          )}
          <input
            type="text"
            autoComplete="on"
            placeholder="Username or Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-group form-control"
          />
          <input
            type="password"
            autoComplete="on"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-group form-control"
          />
          <div className="form-group form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="remember_me"
            />
            <label className="form-check-label text-dark" htmlFor="remember_me">
              Remember me
            </label>
          </div>
          <div className="action-btn form-group">
            <button className="btn btn-primary">LOGIN</button>

            <button
              type="button"
              onClick={handleLoginGoogle}
              className="btn btn-success"
            >
              LOGIN WITH FPT EMAIL
            </button>
          </div>
          <Link to="/forgot-password">
            <small className="note text-danger font-italic">
              Forgotten your username or password?
            </small>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
