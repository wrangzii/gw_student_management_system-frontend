import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import { Loading } from "~/components";
import AuthHeading from "./partials/AuthHeading";

import styles from "~/styles/components/form.module.scss";
import httpRequest from "~/utils/httpRequest";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const navigate = useNavigate();
  const href = window.location.href;
  let resetToken = href.substring(href.indexOf("=") + 1);

  // Handle reset password
  const handleResetPassword = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setIsError(true);
      setMsg("Passwords do not match!");
      return false;
    }
    setIsLoaded(false);
    httpRequest
      .post(`confirm_reset?token=${resetToken}`, {
        password,
        confirmPassword,
      })
      .then((result) => {
        if (result && password === confirmPassword) {
          setIsError(false);
          setMsg(result.data.message);
          setIsLoaded(true);
          navigate("/");
        }
      })
      .catch((error) => {
        setIsLoaded(true);
        setIsError(true);
        setMsg("Passwords do not match!");
      });
  };

  return (
    <div className="reset_password">
      <form onSubmit={handleResetPassword} className="form-group">
        <AuthHeading form="reset" />
        <div className={styles["form-body"]}>
          {
            <small
              className={`mb-3 d-block ${
                !isError ? "text-success" : "text-danger"
              }`}
            >
              {isLoaded ? msg : <Loading />}
            </small>
          }
          <input
            type="password"
            placeholder="New password"
            onChange={(e) => {
              setPassword(e.target.value);
              setMsg("");
            }}
            className="form-group form-control"
          />
          <input
            type="password"
            placeholder="Confirm password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setMsg("");
            }}
            className="form-group form-control"
          />
          <div className={`${styles["handler-btn"]} form-group`}>
            <Link to={"/"} className="btn btn-danger">
              Cancel
            </Link>
            <button className="btn btn-success">Confirm</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
