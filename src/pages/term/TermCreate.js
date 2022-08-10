import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { headers } from "~/utils/headersToken";
import { ErrorHandler, HandlerBtns, UserExecuted } from "~/components";
import { useAuth } from "~/store/auth";
import Create from "~/components/crud/Create";
import HeadingTitle from "~/components/headingTitle/HeadingTitle";

import styles from "~/styles/components/form.module.scss";

function TermCreate() {
  const form = "create";
  const [termName, setTermName] = useState("");
  const [termCode, setTermCode] = useState("");
  const [description, setDescription] = useState("");
  const [isError, setIsError] = useState(false);
  const { auth } = useAuth();
  const createBy = auth.username;
  const navigate = useNavigate();

  // Handle create term
  const handleCreateTerm = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:8080/term/add",
      headers,
      data: JSON.stringify({ termName, termCode, description, createBy }),
    })
      .then((result) => (result ? navigate("../view") : null))
      .catch((error) => {
        if (error.response.status === 400) {
          setIsError(true);
        }
      });
  };

  return (
    <Create>
      <form onSubmit={handleCreateTerm} className="form-group">
        <HeadingTitle title={"term"} form={form} />
        <div className={styles["form-body"]}>
          {isError ? (
            <ErrorHandler name={termName} msg={"is already taken!"} />
          ) : null}
          <div className="d-flex">
            <label htmlFor="term">Term</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                setTermName(e.target.value);
                setIsError(false);
              }}
              placeholder="Spring 2022"
            />
          </div>
          <div className="d-flex">
            <label htmlFor="term">Term Code</label>
            <input
              type="text"
              placeholder="SPR22"
              className="form-control"
              onChange={(e) => {
                setTermCode(e.target.value);
                setIsError(false);
              }}
            />
          </div>
          <div className="d-flex">
            <label htmlFor="term">Description</label>
            <textarea
              cols="30"
              rows="2"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <UserExecuted type={form} />
          <HandlerBtns action={form} />
        </div>
      </form>
    </Create>
  );
}

export default TermCreate;
