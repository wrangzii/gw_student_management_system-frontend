import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ErrorHandler, HandlerBtns, UserExecuted, Loading } from "~/components";
import { useAuth } from "~/store/auth";
import Create from "~/components/crud/Create";
import HeadingTitle from "~/components/headingTitle/HeadingTitle";
import httpRequest from "~/utils/httpRequest";
import {ToastContainer, toast} from "react-toastify"

import styles from "~/styles/components/form.module.scss";

function StudentClassCreate() {
  const form = "create";
  const { auth } = useAuth();
  const [datas, setDatas] = useState({
    fptId: "",
    classCode: "",
    studying: false,
    createBy: auth?.user?.username,
  });
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const navigate = useNavigate();

  // Handle create class
  const handleCreateClass = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    httpRequest
      .post("studentClass/add", datas)
      .then((result) => {
        toast(result?.data?.message)
        setIsLoaded(true);
      })
      .catch((error) => {
        error?.response?.status === 400 && setIsError(true);
        setIsLoaded(true);
      });
  };

  // Handle change value
  const handleChange = (e) => {
    setDatas({
      ...datas,
      [e.target.name]: e.target.value,
      studying: e.target.checked,
    });
  };

  return (
    <Create>
      <ToastContainer />
      {isLoaded ? (
        <form onSubmit={handleCreateClass} className="form-group">
          <HeadingTitle title={"student class"} form={form} />
          <div className={styles["form-body"]}>
            {/* {isError ? (
              <ErrorHandler name={`"${className}"`} msg={"is already taken!"} />
            ) : null} */}
            <div className="d-flex">
              <label>FPT ID</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                placeholder="GCS190795"
                name="fptId"
              />
            </div>
            <div className="d-flex">
              <label>Class Code</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                placeholder="GCS_Tutor_SP22.3"
                name="classCode"
              />
            </div>
            <div className="d-flex">
              <label>Studying</label>
              <input
                type="checkbox"
                className="form-check mb-3"
                onChange={handleChange}
                name="studying"
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

export default StudentClassCreate;
