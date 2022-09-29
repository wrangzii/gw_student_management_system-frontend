import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ErrorHandler, HandlerBtns, UserExecuted, Loading } from "~/components";
import { useAuth } from "~/store/auth";
import Create from "~/components/crud/Create";
import HeadingTitle from "~/components/headingTitle/HeadingTitle";
import httpRequest from "~/utils/httpRequest";

import styles from "~/styles/components/form.module.scss";

function DepartmentCreate() {
  const form = "create";
  const [departmentName, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const { auth } = useAuth();
  const createBy = auth?.user?.username;
  const navigate = useNavigate();

  // Handle create department
  const handleCreateDepartment = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    httpRequest
      .post("department/add", { departmentName, description, createBy })
      .then((result) => {
        result && navigate("../view");
        setIsLoaded(true);
      })
      .catch((error) => {
        error?.response?.status === 400 && setIsError(true);
        setIsLoaded(true);
      })
  };

  return (
    <Create>
      {isLoaded ? (
        <form onSubmit={handleCreateDepartment} className="form-group">
          <HeadingTitle title={"department"} form={form} />
          <div className={styles["form-body"]}>
            {isError ? (
              <ErrorHandler
                name={`"${departmentName}"`}
                msg={"is already taken!"}
              />
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
            <UserExecuted type={form} />
            <HandlerBtns action={form} />
          </div>
        </form>
      ) : (
        <Loading />
      )}
    </Create>
  );
}

export default DepartmentCreate;
