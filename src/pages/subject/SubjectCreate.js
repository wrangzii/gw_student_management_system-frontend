import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Create from "~/components/crud/Create";
import { ErrorHandler, HandlerBtns, UserExecuted, Loading } from "~/components";
import { useAuth } from "~/store/auth";
import HeadingTitle from "~/components/headingTitle/HeadingTitle";
import httpRequest from "~/utils/httpRequest";

import styles from "~/styles/components/form.module.scss";

function SubjectCreate() {
  const form = "create";
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [description, setDescription] = useState("");
  const [replaceWith, setReplaceWith] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const { auth } = useAuth();
  const createBy = auth?.user?.username;
  const navigate = useNavigate();

  // Handle create subject
  const handleCreateSubject = (e) => {
    e.preventDefault();
    setIsLoaded(false)
    httpRequest
      .post("subject/add", {
        subjectName,
        subjectCode,
        description,
        replaceWith,
        createBy,
      })
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
        <form onSubmit={handleCreateSubject} className="form-group">
          <HeadingTitle title={"subject"} form={form} />
          <div className={styles["form-body"]}>
            {isError ? (
              <ErrorHandler name={subjectName} msg={"is already taken!"} />
            ) : null}
            <div className="d-flex">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setSubjectName(e.target.value);
                  setIsError(false);
                }}
                placeholder="Advanced Programming"
              />
            </div>
            <div className="d-flex">
              <label htmlFor="subjectCode">Subject Code</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setSubjectCode(e.target.value);
                  setIsError(false);
                }}
                placeholder="ADV_PM"
              />
            </div>
            <div className="d-flex">
              <label htmlFor="subject">Description</label>
              <textarea
                cols="30"
                rows="2"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="d-flex">
              <label htmlFor="replaceWith">Replace With</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setReplaceWith(e.target.value);
                }}
                placeholder="ADPM101"
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

export default SubjectCreate;
