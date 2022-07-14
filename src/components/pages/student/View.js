import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { headers } from "../../headersToken";
import Pagination from "../../partials/Pagination";
import PopupConfirm from "../../partials/PopupConfirm";

function View() {
  const [students, setStudents] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [popup, setPopup] = useState({
    message: "",
    isLoading: false,
  });
  const handlePopup = (message, isLoading) => {
    setPopup({
      message,
      isLoading,
    });
  };
  const studentIdRef = useRef();

  // Call list of student
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/student/all?pageNumber=${pageNumber}`,
      headers,
    })
      .then((result) => {
        setStudents(result.data);
      })
      .catch((error) => console.log(error));
  }, [pageNumber]);

  // Handle delete student
  const handleDelete = (studentId) => {
    handlePopup("Are you sure to delete?", true);
    studentIdRef.current = studentId;
  };

  // Confirm to delete student
  const confirmDelete = (choose) => {
    if (choose) {
      axios({
        method: "delete",
        url: `http://localhost:8080/student/delete/${studentIdRef.current}`,
        headers,
      }).then((result) => {
        const newStudentList = [...students];
        const index = students.findIndex(
          (student) => student.studentId === studentIdRef.current
        );
        newStudentList.splice(index, 1);
        setStudents(newStudentList);
      });
      handlePopup("", false);
    } else {
      handlePopup("", false);
    }
  };

  return (
    <div className="student-view">
      <div className="filter-area">
        <div className="filter-are__major col-6">
          <div className="major-dropdown dropdown d-flex">
            <label htmlFor="major">Major</label>
            <button
              className="btn btn-info dropdown-toggle"
              type="button"
              id="major_dropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Major
            </button>
            <div className="dropdown-menu" aria-labelledby="major_dropdown">
              <Link className="dropdown-item" to="/">
                IT
              </Link>
              <Link className="dropdown-item" to="/">
                BM
              </Link>
              <Link className="dropdown-item" to="/">
                GD
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-auto">
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>FPT_ID</th>
              <th>Fullname</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Birthday</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, i) => (
              <tr key={student.studentId}>
                <td>{i + 1}</td>
                <td>{student.fptId}</td>
                <td>{student.fullName}</td>
                <td>{student.gender}</td>
                <td>{student.email}</td>
                <td>{new Date(student.dob).toLocaleDateString()}</td>
                <td>
                  <Link to={`detail/${student.studentId}`}>
                    <i className="fa-solid fa-circle-info"></i>
                  </Link>
                  <Link to={`../update/${student.studentId}`}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                  <button onClick={() => handleDelete(student.studentId)}>
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
      {popup.isLoading && (
        <PopupConfirm message={popup.message} onPopup={confirmDelete} />
      )}
    </div>
  );
}

export default View;
