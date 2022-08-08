import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { headers } from "~/utils/headersToken";
import { HandlerBtns, ErrorHandler, CreatedBy } from "~/components/partials";
import { useAuth } from "~/store/auth";
import Create from "~/components/partials/crud/Create";
import HeadingTitle from "~/components/partials/headingTitle/HeadingTitle";

import styles from "~/styles/components/form.module.scss";

function MajorCreate() {
  const [vName, setVName] = useState("");
  const [eName, setEName] = useState("");
  const [majorCode, setMajorCode] = useState("");
  const [isError, setIsError] = useState(false);
  const { auth } = useAuth();
  const createBy = auth.username;
  const navigate = useNavigate();

  // Handle create major
  const handleCreateMajor = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:8080/major/add",
      headers,
      data: JSON.stringify({ vName, eName, majorCode, createBy }),
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
      <form onSubmit={handleCreateMajor} className="form-group">
        <HeadingTitle title={"major"} form={"create"} />
        <div className={styles["form-body"]}>
          {isError ? (
            <ErrorHandler name={vName} msg={"is already taken!"} />
          ) : null}
          <div className="d-flex">
            <label htmlFor="major">V_Major Name</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                setVName(e.target.value);
                setIsError(false);
              }}
              placeholder="Computer Science"
            />
          </div>
          <div className="d-flex">
            <label htmlFor="major">E_Major Name</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                setEName(e.target.value);
                setIsError(false);
              }}
              placeholder="Front End Developer"
            />
          </div>
          <div className="d-flex">
            <label htmlFor="major">Major Code</label>
            <input
              type="text"
              placeholder="FE_DEV22"
              className="form-control"
              onChange={(e) => {
                setMajorCode(e.target.value);
                setIsError(false);
              }}
            />
          </div>
          <CreatedBy />
          <HandlerBtns action={"Create"} />
        </div>
      </form>
    </Create>
  );
}

export default MajorCreate;
