import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import ErrorHandler from "../partials/ErrorHandler";
import Loading from "../partials/Loading/Loading";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    axios({
      method: "post",
      url: "http://localhost:8080/login",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({ username, password }),
    })
      .then((result) => {
        setIsError(false);
        if (result) {
          const data = result.data.data;
          Cookies.set("token", data.token);
          const user = {
            userId: data.id,
            username: data.username,
            email: data.email,
            phoneNumber: data.phoneNumber,
            address: data.address,
            dob: data.dob,
            fullName: data.fullName,
            roles: data.roles,
          };

          localStorage.setItem("user", JSON.stringify(user));
          setIsLoaded(true);
          window.location.reload();
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setIsLoaded(true);
          setIsError(true);
        }
      });
  };
  return (
    <div className="login">
      {isLoaded ? (
        <form onSubmit={handleLogin} className="form-group">
          <h2 className="form-heading bg-primary text-white text-center">
            WELCOME TO CMS
          </h2>
          <div className="form-body">
            {isError ? (
              <ErrorHandler msg={"Username or password is incorrect!"} />
            ) : null}
            <input
              type="text"
              autoComplete="on"
              placeholder="Username or Email"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setIsError(false);
              }}
              className="form-group form-control"
            />
            <input
              type="password"
              autoComplete="on"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setIsError(false);
              }}
              className="form-group form-control"
            />
            <div className="handler-btn form-group">
              <button className="btn btn-primary">LOGIN</button>
              <a
                href={"http://localhost:8080/oauth2/authorization/google"}
                className="btn btn-success"
              >
                <i
                  className="fa-brands fa-google py-0"
                  style={{ color: "#DB4437" }}
                ></i>
                LOGIN WITH FPT EMAIL
              </a>
            </div>
            <Link to="/forgot-password">
              <small className="note text-danger font-italic">
                Forgotten your username or password?
              </small>
            </Link>
          </div>
        </form>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Login;
