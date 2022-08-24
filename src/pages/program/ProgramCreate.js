import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ErrorHandler, HandlerBtns, UserExecuted, Loading } from "~/components";
import { useAuth } from "~/store/auth";
import Create from "~/components/crud/Create";
import HeadingTitle from "~/components/headingTitle/HeadingTitle";

import styles from "~/styles/components/form.module.scss";
import httpRequest from "~/utils/httpRequest";

function ProgramCreate() {
  const form = "create";
  const [programName, setProgramName] = useState("");
  const [description, setDescription] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const { auth } = useAuth();
  const createBy = auth?.user?.username;
  const navigate = useNavigate();

  // Handle create program
  const handleCreateProgam = (e) => {
    e.preventDefault();
    setIsLoaded(false)
    httpRequest
      .post("program/add", { programName, description, createBy })
      .then((result) => {
        result && navigate("../view");
        setIsLoaded(true);
      })
      .catch((error) => {
        error?.response?.status === 400 && setIsError(true);
        setIsLoaded(true);
      });
  };
  return (
    <Create>
      {isLoaded ? (
        <form onSubmit={handleCreateProgam} className="form-group">
          <HeadingTitle title={"program"} form={form} />
          <div className={styles["form-body"]}>
            {isError ? (
              <ErrorHandler
                name={`"${programName.toLocaleUpperCase()}"`}
                msg={"is already taken!"}
              />
            ) : null}
            <div className="program-name d-flex">
              <label htmlFor="program_name">Program Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="BTEC"
                onChange={(e) => {
                  setProgramName(e.target.value.toLocaleUpperCase());
                  setIsError(false);
                }}
              />
            </div>
            <div className="description d-flex">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                placeholder="About this program"
                onChange={(e) => setDescription(e.target.value)}
              />
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

export default ProgramCreate;
