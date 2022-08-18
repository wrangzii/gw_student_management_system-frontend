import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Create from "~/components/crud/Create";
import { ErrorHandler, HandlerBtns, Loading, UserExecuted } from "~/components";
import { useAuth } from "~/store/auth";
import HeadingTitle from "~/components/headingTitle/HeadingTitle";
import httpRequest from "~/utils/httpRequest";

import styles from "~/styles/components/form.module.scss";

function RoleCreate() {
  const form = "create";
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [isError, setIsError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(true);
  const { auth } = useAuth();
  const createBy = auth?.user?.username;
  const navigate = useNavigate();

  // Handle create role
  const handleCreateRole = (e) => {
    e.preventDefault();
    setIsLoaded(false)
    httpRequest
      .post("role/add", { roleName, description, createBy })
      .then((result) => {
        result && navigate("../view");
        setIsLoaded(true)
      })
      .catch((error) => {
        error?.response?.status === 400 && setIsError(true);
        setIsLoaded(true);
      });
  };

  return (
    <Create>
      {isLoaded ? (
        <form onSubmit={handleCreateRole} className="form-group">
          <HeadingTitle title={"role"} form={form} />
          <div className={styles["form-body"]}>
            {isError ? (
              <ErrorHandler
                name={`"${roleName}"`}
                msg={"is already taken!"}
              />
            ) : null}
            <div className="d-flex">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setRoleName(e.target.value);
                  setIsError(false)
                }}
                placeholder="Accountant Leader"
              />
            </div>
            <div className="d-flex">
              <label htmlFor="description">Description</label>
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

export default RoleCreate;
