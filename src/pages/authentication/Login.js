import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import Cookies from "js-cookie";

import axios from "axios";

import { ErrorHandler, Loading } from "~/components";
import { useAuth } from "~/store/auth";
import AuthHeading from "./partials/AuthHeading";

import styles from "./login.module.scss";
import httpRequest from "~/utils/httpRequest";

function Login() {
  const { setAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const redirectPath = location.state?.path || "/";

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    httpRequest
      .post("login", { username, password })
      .then((result) => {
        setIsError(false);
        if (result) {
          const data = result?.data?.data;
          // Store user's token
          const accessToken = data.token;
          Cookies.set("token", accessToken);

          // Store user's info
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
          Cookies.set("user", JSON.stringify(user));
          setIsLoaded(true);
          setAuth({ accessToken, user });
          navigate(redirectPath, { replace: true });
        }
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          setIsLoaded(true);
          setIsError(true);
        }
      });
  };

  return (
    <div className={styles["login"]}>
      {isLoaded ? (
        <form onSubmit={handleLogin} className="form-group">
          <AuthHeading form="login" />
          <div className={styles["form-body"]}>
            {isError ? (
              <ErrorHandler msg={"Username or password is incorrect!"} />
            ) : null}
            <input
              type="text"
              autoComplete="off"
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
              autoComplete="off"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setIsError(false);
              }}
              className="form-group form-control"
            />
            <div className={`${styles["handler-btn"]} form-group`}>
              <button className="btn btn-primary fw-bold">LOGIN</button>
              <a
                href={"http://localhost:8080/oauth2/authorization/google"}
                className="btn btn-success fw-bold"
              >
                <i
                  className="fa-brands fa-google py-0"
                  style={{ color: "#DB4437" }}
                ></i>
                LOGIN WITH FPT EMAIL
              </a>
            </div>
            <Link to="/forgot-password">
              <small className={`${styles["note"]} text-danger font-italic`}>
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
