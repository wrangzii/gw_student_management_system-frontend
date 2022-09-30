import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { HandlerBtns, Loading, UserExecuted } from "~/components";
import { useAuth } from "~/store/auth";
import Update from "~/components/crud/Update";
import HeadingTitle from "~/components/headingTitle/HeadingTitle";
import httpRequest from "~/utils/httpRequest";

import styles from "~/styles/components/form.module.scss";

function SubjectUpdate() {
  const { auth } = useAuth();
  const { id } = useParams();
  const form = "update";
  const [data, setData] = useState({
    subjectName: "",
    subjectCode: "",
    replaceWith: "",
    description: "",
    modifyBy: auth?.user?.username,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();
  console.log(id);
  // Get current info
  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`subject/filter?pageNumber=0&search=subjectCode:*${id}`)
      .then((result) => {
        const data = result?.data?.data[0];
        setData({
          subjectName: data.subjectName,
          subjectCode: data.subjectCode,
          replaceWith: data.replaceWith,
          description: data.description,
        });
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  }, [id]);

  // handle change value
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // Handle update subject
  const handleUpdateSubject = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    httpRequest
      .put(`subject/edit/${id}`, data)
      .then((result) => {
        result && navigate("../view");
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  };
  return (
    <Update>
      {isLoaded ? (
        <form onSubmit={handleUpdateSubject} className="form-group">
          <HeadingTitle title={"subject"} form={form} />
          <div className={styles["form-body"]}>
            <div className="d-flex">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                className="form-control"
                defaultValue={data.subjectName}
                onChange={handleChange}
                placeholder="Advanced Programming"
                name="subjectName"
              />
            </div>
            <div className="d-flex">
              <label htmlFor="subjectCode">Subject Code</label>
              <input
                type="text"
                className="form-control"
                defaultValue={data.subjectCode}
                placeholder="ADV_PM"
                readOnly
                name="subjectCode"
              />
            </div>
            <div className="d-flex">
              <label htmlFor="description">Description</label>
              <textarea
                cols="30"
                rows="2"
                className="form-control"
                defaultValue={data.description}
                onChange={handleChange}
                name="description"
              ></textarea>
            </div>
            <div className="d-flex">
              <label htmlFor="replaceWith">Replace With</label>
              <input
                type="text"
                className="form-control"
                defaultValue={data.replaceWith}
                onChange={handleChange}
                placeholder="ADPM101"
                name="replaceWith"
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
