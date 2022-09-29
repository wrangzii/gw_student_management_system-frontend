import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Loading } from "~/components";
import httpRequest from "~/utils/httpRequest";
import HeadingTitle from "~/components/headingTitle/HeadingTitle";
import { ToastContainer, toast } from "react-toastify";

function ImportGrade() {
  const { id } = useParams();
  const form = "update";
  const [programs, setPrograms] = useState([
    {
      label: "",
      value: "",
    },
  ]);
  const [subjects, setSubjects] = useState([]);
  const [fieldValue, setFieldValue] = useState({
    fptId: id,
    programId: "",
    subjectCode: "",
    mark: "",
    attendancePercent: "",
    startDate: "",
    endDate: "",
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Program
  const callListProgram = () => {
    httpRequest
      .get(`program/all?pageNumber=0`)
      .then((result) => {
        const data = result?.data;
        setPrograms(data?.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  };

  // Subject
  const callListSubject = () => {
    httpRequest
      .get(`subject/all?pageNumber=0`)
      .then((result) => {
        const data = result?.data;
        setSubjects(data?.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  };

  // Grade
  const grades = [
    {
      label: "Studying",
      value: "Studying",
    },
    {
      label: "Refer",
      value: "Refer",
    },
    {
      label: "P",
      value: "Pass",
    },
    {
      label: "M",
      value: "Merit",
    },
    {
      label: "D",
      value: "Distinction",
    },
  ];

  useEffect(() => {
    setIsLoaded(false);
    callListProgram();
    callListSubject();
    console.log(programs);
  }, []);

  const handleChange = (e) => {
    setFieldValue({
      ...fieldValue,
      [e.target.name]: e.target.value,
    });
  };

  // submit grade
  const handleSubmitForm = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    httpRequest
      .post(`student/subject/add`, fieldValue)
      .then((result) => {
        result && toast("Import grade successfully!")
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <ToastContainer />
      <HeadingTitle title={"Grade"} form={form} />
      {isLoaded ? (
        <ul className="p-4">
          <li className="form-group d-flex gap-3">
            <label style={{ width: "150px", whiteSpace: "nowrap" }}>
              FPT ID
            </label>
            <input
              type="text"
              className="form-control"
              defaultValue={id}
              readOnly
              name="fptId"
            />
          </li>
          <li className="form-group d-flex gap-3">
            <label style={{ width: "150px", whiteSpace: "nowrap" }}>
              Program ID
            </label>
            <select
              name="programId"
              className="form-select"
              onChange={handleChange}
            >
              <option>--Select--</option>
              {programs.map((program, index) => (
                <option key={index} value={program.programId}>
                  {program.programName}
                </option>
              ))}
            </select>
          </li>
          <li className="form-group d-flex gap-3">
            <label style={{ width: "150px", whiteSpace: "nowrap" }}>
              Subject Code
            </label>
            <select
              onChange={handleChange}
              className="form-select"
              name="subjectCode"
            >
              <option>--Select--</option>
              {subjects?.map((subject, index) => (
                <option key={index} value={subject.subjectCode}>
                  {subject.subjectCode}
                </option>
              ))}
            </select>
          </li>
          <li className="form-group d-flex gap-3">
            <label style={{ width: "150px", whiteSpace: "nowrap" }}>
              Grade
            </label>
            <select onChange={handleChange} className="form-select" name="mark">
              <option>--Select--</option>
              {grades.map((grade, index) => (
                <option key={index} value={grade.value} id={grade.value}>
                  {grade.label}
                </option>
              ))}
            </select>
          </li>
          <li className="form-group d-flex gap-3">
            <label style={{ width: "150px", whiteSpace: "nowrap" }}>
              Attendance
            </label>
            <input
              onChange={handleChange}
              type="number"
              min="0"
              max="100"
              className="form-control"
              name="attendancePercent"
            />
          </li>
          <li className="form-group d-flex gap-3">
            <label style={{ width: "150px", whiteSpace: "nowrap" }}>
              Start Date
            </label>
            <input
              onChange={handleChange}
              type="date"
              min="1899-01-01"
              className="form-control"
              name="startDate"
            />
          </li>
          <li className="form-group d-flex gap-3">
            <label style={{ width: "150px", whiteSpace: "nowrap" }}>
              End Date
            </label>
            <input
              onChange={handleChange}
              type="date"
              min="1899-01-01"
              className="form-control"
              name="endDate"
            />
          </li>
          <li className="d-flex gap-3 justify-content-center">
            <button type="button" className="btn btn-danger">
              Reset
            </button>
            <button className="btn btn-success">Import</button>
          </li>
        </ul>
      ) : (
        <Loading />
      )}
    </form>
  );
}

export default ImportGrade;
