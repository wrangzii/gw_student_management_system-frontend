import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { headers } from "~/utils/headersToken";
import { HandlerBtns, ErrorHandler, CreatedBy } from "~/components/partials";
import { useAuth } from "~/store/auth";
import Create from "~/components/partials/crud/Create";
import HeadingTitle from "~/components/partials/headingTitle/HeadingTitle";

import styles from "~/styles/components/form.module.scss";

function DepartmentCreate() {
  const [departmentName, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");
  const [isError, setIsError] = useState(false);
  const { auth } = useAuth();
  const createBy = auth.username;
  const navigate = useNavigate();

  // Handle create department
  const handleCreateDepartment = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:8080/department/add",
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
      <form onSubmit={handleCreateDepartment} className="form-group">
        <HeadingTitle title={"department"} form={"create"} />
        <div className={styles["form-body"]}>
          {isError ? (
            <ErrorHandler name={departmentName} msg={"is already taken!"} />
          ) : null}
          <div className="department-dropdown dropdown d-flex">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                setDepartmentName(e.target.value);
                setIsError(false);
              }}
              placeholder="Assurance"
            />
          </div>
          <div className="department-dropdown dropdown d-flex">
            <label htmlFor="department">Description</label>
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

export default DepartmentCreate;
