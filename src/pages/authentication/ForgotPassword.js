import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Loading } from "~/components";
import AuthHeading from "./partials/AuthHeading";
import httpRequest from "~/utils/httpRequest";

import styles from "~/styles/components/form.module.scss";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  // Handle forgot password
  const handleForgotPassword = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    httpRequest
      .post("forgot_password", { email })
      .then((result) => {
        setIsError(false);
        setMsg(result?.data?.message);
        setIsLoaded(true);
      })
      .catch((error) => {
        if (error?.response?.status === 400) {
          setIsError(true);
          setIsLoaded(true);
          if (!email.includes("@")) {
            setMsg("Email address is not valid!");
          } else {
            setMsg("Email address not found!");
          }
        }
      });
  };

  return (
    <div className="forgot_password">
      <form onSubmit={handleForgotPassword} className="form-group">
        <AuthHeading form="forgot" />
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
            type="text"
            placeholder="Username or Email"
            onChange={(e) => {
              setEmail(e.target.value);
              setMsg("");
            }}
            className="form-group form-control"
          />
          <div className={`${styles["handler-btn"]} form-group`}>
            <Link to={"/login"} className="btn btn-danger">
              Cancel
            </Link>
            <button className="btn btn-warning">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
