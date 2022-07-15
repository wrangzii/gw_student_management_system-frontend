import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { headers } from "../headersToken";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);

  // Handle forgot password
  const handleForgotPassword = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:8080/forgot_password",
      headers,
      data: JSON.stringify({ email }),
    })
      .then((result) => {
        setIsError(false);
        setMsg(result.data.message);
      })
      .catch((error) => {
        setIsError(true);
        if (!email.includes("@")) {
          setMsg("Email address is not valid!");
        } else {
          setMsg("Email address not found!");
        }
      });
  };

  return (
    <div className="forgot_password">
      <form onSubmit={handleForgotPassword} className="form-group">
        <h2 className="form-heading bg-success text-white text-center">
          FORGOT PASSWORD
        </h2>
        <div className="form-body">
          {
            <small
              className={`mb-3 d-block ${
                !isError ? "text-success" : "text-danger"
              }`}
            >
              {msg}
            </small>
          }
          <input
            type="text"
            placeholder="Username or Email"
            onChange={(e) => setEmail(e.target.value)}
            className="form-group form-control"
          />
          <div className="action-btn form-group">
            <button className="btn btn-success">Reset my password</button>
            <Link to={"/"} className="btn btn-danger">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
