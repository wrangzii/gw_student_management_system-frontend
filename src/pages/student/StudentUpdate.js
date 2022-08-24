import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { HandlerBtns, Loading, UserExecuted } from "~/components";
import { useAuth } from "~/store/auth";
import Update from "~/components/crud/Update";
import HeadingTitle from "~/components/headingTitle/HeadingTitle";
import httpRequest from "~/utils/httpRequest";

import styles from "~/styles/components/form.module.scss";

function StudentUpdate() {
  const form = "update";
  const [fptId, setFptId] = useState("");
  const [personId, setPersonId] = useState("");
  const [uogId, setUogId] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const { auth } = useAuth();
  const modifyBy = auth?.user?.username;
  const { id } = useParams();
  const navigate = useNavigate();

  // Get current info
  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`student/${id}`)
      .then((result) => {
        let data = result?.data?.data;
        setFptId(data.fptId);
        setPersonId(data.personId);
        setUogId(data.uogId);
        setFullName(data.fullName);
        setDob(data.dob);
        setGender(data.gender);
        setEmail(data.email);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  }, [id]);

  // Handle update student
  const handleUpdateStudent = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    httpRequest
      .put(`student/edit/${id}`, {
        fptId,
        personId,
        uogId,
        fullName,
        dob,
        gender,
        modifyBy,
        email,
      })
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
        <form onSubmit={handleUpdateStudent} className="form-group">
          <HeadingTitle title={"student"} form={form} />
          <div className={styles["form-body"]}>
            <div className="form-body__left">
              <div className="fullname form-group d-flex">
                <label htmlFor="fullname">Fullname</label>
                <input
                  defaultValue={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  placeholder="Nguyen Van A"
                  className="form-control"
                />
              </div>
              <div className="email form-group d-flex">
                <label htmlFor="email">Email</label>
                <input
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="nguyenvana@fe.edu.vn"
                  className="form-control"
                />
              </div>
              <div className="gender-dropdown dropdown d-flex">
                <label htmlFor="gender">Gender</label>
                <div className="d-flex mb-4">
                  <label htmlFor="male">
                    Male
                    <input
                      defaultValue={"Male" || gender}
                      onChange={(e) => setGender(e.target.value)}
                      type="radio"
                      id="male"
                      className="ms-1"
                      name="gender"
                      checked={gender === "Male" ? true : false}
                    />
                  </label>
                  <label htmlFor="female">
                    Female
                    <input
                      defaultValue={"Female" || gender}
                      onChange={(e) => setGender(e.target.value)}
                      type="radio"
                      id="female"
                      className="ms-1"
                      name="gender"
                      checked={gender === "Female" ? true : false}
                    />
                  </label>
                </div>
              </div>
              <div className="birthday form-group d-flex">
                <label htmlFor="birthday">Birthday</label>
                <input
                  defaultValue={dob.replace(" 00:00:00.0", "")}
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
                  defaultValue={fptId}
                  onChange={(e) => setFptId(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="GCS190795"
                />
              </div>
              <div className="d-flex">
                <label htmlFor="person_id">Person ID</label>
                <input
                  defaultValue={personId}
                  onChange={(e) => setPersonId(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="KHANHTQ190795"
                />
              </div>
              <div className="d-flex">
                <label htmlFor="uog_id">UOG ID</label>
                <input
                  defaultValue={uogId}
                  onChange={(e) => setUogId(e.target.value)}
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
    </Update>
  );
}

export default StudentUpdate;
