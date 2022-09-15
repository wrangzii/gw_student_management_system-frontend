import React from "react";
import { useParams, Link } from "react-router-dom";
import httpRequest from "~/utils/httpRequest";

function InsertGrade() {
  const studentId = useParams().id

  const handleInsertGrade = (e) => {
    // httpRequest
    //   .post("student/add/program/major")
    //   .then((result) => console.log(result));
  };

  return (
    // <button
    //   onClick={(e) => handleInsertGrade(e)}
    //   className="btn btn-primary ms-0 ms-md-2"
    // >
    //   <i className="fa-solid fa-marker me-2 p-0"></i>
    //   Insert grade
    // </button>
    <form className="insert-grade">
      <h2>Insert Student's Grade</h2>
      <div className="form-group">
        <select name="programId" className="form-select">
          <option value=""></option>
        </select>
      </div>
      <div className="form-group">
        <select name="term" className="form-select">
          <option value=""></option>
        </select>
      </div>
      <div className="form-group">
        <select name="term" className="form-select">
          <option value=""></option>
        </select>
      </div>
    </form>
  );
}

export default InsertGrade;
