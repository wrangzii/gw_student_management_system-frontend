import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { headers } from "~/utils/headersToken";
import { HandlerBtns, ErrorHandler, CreatedBy } from "~/components/partials";
import { useAuth } from "~/store/auth";
import Create from "~/components/partials/crud/Create";

import styles from "~/styles/components/form.module.scss";

function TermCreate() {
  const [departmentName, setTermName] = useState("");
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
      data: JSON.stringify({ departmentName, description, createBy }),
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
        <h2
          className={`${styles["form-heading"]} bg-success text-white text-center`}
        >
          CREATING A NEW term
        </h2>
        <div className={styles["form-body"]}>
          {isError ? (
            <ErrorHandler name={departmentName} msg={"is already taken!"} />
          ) : null}
          <div className="term-dropdown dropdown d-flex">
            <label htmlFor="term">term</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                setTermName(e.target.value);
                setIsError(false);
              }}
              placeholder="Assurance"
            />
          </div>
          <div className="term-dropdown dropdown d-flex">
            <label htmlFor="term">Description</label>
            <textarea
              cols="30"
              rows="2"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <CreatedBy />
          <HandlerBtns action={"Create"} />
        </div>
      </form>
    </Create>
  );
}

export default TermCreate;
