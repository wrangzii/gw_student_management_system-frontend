import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Create from "~/components/crud/Create";
import { ErrorHandler, HandlerBtns, UserExecuted, Loading } from "~/components";
import { useAuth } from "~/store/auth";
import HeadingTitle from "~/components/headingTitle/HeadingTitle";
import httpRequest from "~/utils/httpRequest";

import styles from "~/styles/components/form.module.scss";

function MajorCreate() {
  const form = "create";
  const [vietnameseName, setVietnameseName] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [majorCode, setMajorCode] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const { auth } = useAuth();
  const createBy = auth?.user?.username;
  const navigate = useNavigate();

  // Handle create major
  const handleCreateMajor = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    httpRequest
      .post("major/add", { vietnameseName, englishName, majorCode, createBy })
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
        <form onSubmit={handleCreateMajor} className="form-group">
          <HeadingTitle title={"major"} form={form} />
          <div className={styles["form-body"]}>
            {isError ? (
              <ErrorHandler
                name={`"${englishName}"`}
                msg={"is already taken!"}
              />
            ) : null}
            <div className="d-flex">
              <label htmlFor="major">V_Major Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setVietnameseName(e.target.value);
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
                  setEnglishName(e.target.value);
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

export default MajorCreate;
