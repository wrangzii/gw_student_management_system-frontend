import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Create from "~/components/crud/Create";
import { HandlerBtns, UserExecuted, Loading, ErrorHandler } from "~/components";
import { useAuth } from "~/store/auth";
import HeadingTitle from "~/components/headingTitle/HeadingTitle";
import httpRequest from "~/utils/httpRequest";

import styles from "~/styles/components/form.module.scss";
import Select from "react-select";

function StudentCreate() {
  const form = "create";
  const [fptId, setFptId] = useState("");
  const [majorId, setMajorId] = useState(1);
  const [personId, setPersonId] = useState("");
  const [uogId, setUogId] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const { auth } = useAuth();
  const createBy = auth?.user?.username;
  let major_dropdown = useRef();
  const navigate = useNavigate();

  // Handle create student
  const handleCreateStudent = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    httpRequest
      .post("student/add", {
        fptId,
        majorId,
        personId,
        uogId,
        fullName,
        dob,
        gender,
        createBy,
        email,
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

  // Get major list
  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`major/all?pageNumber=${pageNumber}`)
      .then((result) => {
        setMajorId(result?.data);
        return result?.data;
      })
      .then((result) => {
        major_dropdown.current = result?.map((major) => ({
          value: major?.majorId,
          label: major?.majorCode,
        }));
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  }, []);

  // Handle change select
  const handleChange = (e) => {
    setMajorId(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  return (
    <Create>
      {isLoaded ? (
        <form onSubmit={handleCreateStudent} className="form-group">
          <HeadingTitle title={"student"} form={form} />
          <div className={styles["form-body"]}>
            {isError ? (
              <ErrorHandler name={`"${email}"`} msg={"is already taken!"} />
            ) : null}
            <div className="form-body__left">
              <div className="fullname form-group d-flex">
                <label htmlFor="fullname">Fullname</label>
                <input
                  required
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  placeholder="Nguyen Van A"
                  className="form-control"
                />
              </div>
              <div className="major-dropdown dropdown d-flex">
                <label htmlFor="major">Major</label>
                <Select
                  required
                  name="major"
                  options={major_dropdown.current}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleChange}
                />
              </div>
              <div className="email form-group d-flex">
                <label htmlFor="email">Email</label>
                <input
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsError(false);
                  }}
                  type="email"
                  placeholder="nguyenvana@fe.edu.vn"
                  className="form-control"
                />
              </div>
              <div className="gender-dropdown dropdown d-flex">
                <label htmlFor="gender">Gender</label>
                <div className="d-flex mb-4 flex-wrap">
                  <label htmlFor="male">
                    Male
                    <input
                      required
                      onChange={(e) => setGender(e.target.value)}
                      type="radio"
                      id="male"
                      className="ms-1"
                      name="gender"
                      defaultValue={"Male"}
                    />
                  </label>
                  <label htmlFor="female">
                    Female
                    <input
                      required
                      onChange={(e) => setGender(e.target.value)}
                      type="radio"
                      id="female"
                      className="ms-1"
                      name="gender"
                      defaultValue={"Female"}
                    />
                  </label>
                </div>
              </div>
              <div className="birthday form-group d-flex">
                <label htmlFor="birthday">Birthday</label>
                <input
                  required
                  onChange={(e) => setDob(e.target.value)}
                  type="date"
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-body__right">
              <div className="d-flex">
                <label htmlFor="fpt_id">FPT ID</label>
                <input
                  required
                  onChange={(e) => {
                    setFptId(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  placeholder="GCS190795"
                />
              </div>
              <div className="d-flex">
                <label htmlFor="person_id">Person ID</label>
                <input
                  required
                  onChange={(e) => {
                    setPersonId(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  placeholder="KHANHTQ190795"
                />
              </div>
              <div className="d-flex">
                <label htmlFor="uog_id">UOG ID</label>
                <input
                  required
                  onChange={(e) => {
                    setUogId(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  placeholder="UOG190795"
                />
              </div>
              <UserExecuted type={form} />
              <HandlerBtns action={form} />
            </div>
          </div>
        </form>
      ) : (
        <Loading />
      )}
    </Create>
  );
}

export default StudentCreate;
