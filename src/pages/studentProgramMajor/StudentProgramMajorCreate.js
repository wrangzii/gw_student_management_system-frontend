import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ErrorHandler, HandlerBtns, Loading, UserExecuted } from "~/components";
import { useAuth } from "~/store/auth";
import Create from "~/components/crud/Create";
import HeadingTitle from "~/components/headingTitle/HeadingTitle";
import httpRequest from "~/utils/httpRequest";

import styles from "~/styles/components/form.module.scss";

function StudentProgramMajorCreate() {
  const form = "create";
  const [studentId, setStudentId] = useState("");
  const [programId, setProgramId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [majorId, setMajorId] = useState("");
  const [mark, setMark] = useState("");
  const [attendancePercent, setAttendancePercent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isError, setIsError] = useState(false);
  const { auth } = useAuth();
  const createBy = auth?.user?.username;
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  // Handle create studentProgramMajor
  const handleCreateStudentProgramMajor = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    httpRequest
      .post("studentProgramMajor/add", {
        studentId,
        programId,
        subjectId,
        majorId,
        mark,
        attendancePercent,
        startDate,
        endDate,
        createBy,
      })
      .then((result) => {
        result && navigate("../view");
        setIsLoaded(true);
      })
      .catch((error) => {
        if (error?.response?.status === 400) {
          setIsError(true);
          setIsLoaded(true);
        }
      });
  };

  return (
    <Create>
      {isLoaded ? <form onSubmit={handleCreateStudentProgramMajor} className="form-group">
        <HeadingTitle title={"studentProgramMajor"} form={form} />
        <div className={styles["form-body"]}>
          {/* {isError ? (
            <ErrorHandler name={vietnameseName} msg={"is already taken!"} />
          ) : null} */}
          <div className="d-flex">
            <label htmlFor="studentId">Student ID</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                setStudentId(e.target.value);
                setIsError(false);
              }}
              placeholder="Computer Science"
            />
          </div>
          <div className="d-flex">
            <label htmlFor="programId">Program ID</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                setProgramId(e.target.value);
                setIsError(false);
              }}
              placeholder="Front End Developer"
            />
          </div>
          <div className="d-flex">
            <label htmlFor="majorId">Major ID</label>
            <input
              type="text"
              placeholder="FE_DEV22"
              className="form-control"
              onChange={(e) => {
                setMajorId(e.target.value);
                setIsError(false);
              }}
            />
          </div>
          <div className="d-flex">
            <label htmlFor="subjectId">Subject ID</label>
            <input
              type="text"
              placeholder="FE_DEV22"
              className="form-control"
              onChange={(e) => {
                setSubjectId(e.target.value);
                setIsError(false);
              }}
            />
          </div>
          <div className="d-flex">
            <label htmlFor="mark">Mark</label>
            <input
              type="number"
              placeholder="6.5"
              className="form-control"
              onChange={(e) => {
                setMark(e.target.value);
                setIsError(false);
              }}
            />
          </div>
          <div className="d-flex">
            <label htmlFor="attendancePercent">Attendance (%)</label>
            <input
              type="text"
              placeholder="FE_DEV22"
              className="form-control"
              onChange={(e) => {
                setAttendancePercent(e.target.value);
                setIsError(false);
              }}
            />
          </div>
          <div className="d-flex">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="text"
              placeholder="FE_DEV22"
              className="form-control"
              onChange={(e) => {
                setStartDate(e.target.value);
                setIsError(false);
              }}
            />
          </div>
          <div className="d-flex">
            <label htmlFor="endDate">End Date</label>
            <input
              type="text"
              placeholder="FE_DEV22"
              className="form-control"
              onChange={(e) => {
                setEndDate(e.target.value);
                setIsError(false);
              }}
            />
          </div>
          <UserExecuted type={form} />
          <HandlerBtns action={form} />
        </div>
      </form> : <Loading />}
    </Create>
  );
}

export default StudentProgramMajorCreate;
