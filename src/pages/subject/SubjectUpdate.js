import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import { headers } from "~/utils/headersToken";
import { HandlerBtns, Loading, UserExecuted } from "~/components";
import { useAuth } from "~/store/auth";
import Update from "~/components/crud/Update";
import HeadingTitle from "~/components/headingTitle/HeadingTitle";

import styles from "~/styles/components/form.module.scss";

function SubjectUpdate() {
  const form = "update";
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [description, setDescription] = useState("");
  const [replaceWith, setReplaceWith] = useState("");
  const { id } = useParams();
  const { auth } = useAuth();
  const modifyBy = auth.username;
  const navigate = useNavigate();

  // Get current info
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/subject/${id}`,
      headers,
    }).then((result) => {
      const data = result?.data?.data;
      setSubjectName(data.subjectName);
      setSubjectCode(data.subjectCode);
      setReplaceWith(data.replaceWith);
      setDescription(data.description);
    });
  }, [id]);

  // Handle update subject
  const handleUpdateSubject = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: `http://localhost:8080/subject/edit/${id}`,
      headers,
      data: JSON.stringify({
        subjectName,
        subjectCode,
        description,
        replaceWith,
        modifyBy,
      }),
    }).then((result) => (result ? navigate("../view") : null));
  };
  return (
    <Update>
      {subjectName ? (
        <form onSubmit={handleUpdateSubject} className="form-group">
          <HeadingTitle title={"subject"} form={form} />
          <div className={styles["form-body"]}>
            <div className="d-flex">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                className="form-control"
                defaultValue={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder="Advanced Programming"
              />
            </div>
            <div className="d-flex">
              <label htmlFor="subjectCode">Subject Code</label>
              <input
                type="text"
                className="form-control"
                defaultValue={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                placeholder="ADV_PM"
              />
            </div>
            <div className="d-flex">
              <label htmlFor="description">Description</label>
              <textarea
                cols="30"
                rows="2"
                className="form-control"
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="d-flex">
              <label htmlFor="replaceWith">Replace With</label>
              <input
                type="text"
                className="form-control"
                defaultValue={replaceWith}
                onChange={(e) => setReplaceWith(e.target.value)}
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
    </Update>
  );
}

export default SubjectUpdate;
