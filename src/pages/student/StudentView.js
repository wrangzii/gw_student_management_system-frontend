import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import View from "~/components/crud/View";
import { headers } from "~/utils/headersToken";
import { Pagination, PopupConfirm, Loading, SearchBar } from "~/components";
import { usePagination } from "~/store/pagination";
import { useAuth } from "~/store/auth";
import httpRequest from "~/utils/httpRequest";

function StudentView() {
  const { auth } = useAuth();
  const [students, setStudents] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [csvFile, setCsvFile] = useState("");
  const { pagination } = usePagination();
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
  const pageNum = window.location.href.split("=")[1];
  useEffect(() => {
    // axios({
    //   method: "get",
    //   url: `http://localhost:8080/student/all?pageNumber=${
    //     pagination.pageNumber !== undefined
    //       ? pagination.pageNumber
    //       : pageNum || 0
    //   }`,
    //   headers,
    // })
    //   .then((result) => {
    //     setIsLoaded(false);
    //     if (result) setStudents(result.data);
    //     setIsLoaded(true);
    //   })
    //   .catch((error) => console.log(error));
    httpRequest
      .get(
        `student/all?pageNumber=${
          pagination.pageNumber !== undefined
            ? pagination.pageNumber
            : pageNum || 0
        }`
      )
      .then((result) => {
        setIsLoaded(false);
        if (result) setStudents(result.data);
        setIsLoaded(true);
      })
      .catch((error) => console.log(error));
  }, [pageNum, pagination.pageNumber]);

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
        setIsLoaded(true);
        const newStudentList = [...students];
        const index = students.findIndex(
          (student) => student.studentId === studentIdRef.current
        );
        newStudentList.splice(index, 1);
        setStudents(newStudentList);
      });
      handlePopup("", false);
      setIsLoaded(false);
    } else {
      handlePopup("", false);
    }
  };

  // Handle import CSV file
  const formData = new FormData();
  const onFileChange = (e) => {
    const file = e.target?.files[0];
    if (e.target && file) {
      formData.append("file", file);
      setCsvFile(file.name);
    }
  };

  // Handle submit file
  const handleSubmitFile = () => {
    axios({
      method: "post",
      url: "http://localhost:8080/student/insert/file",
      data: formData,
      headers: {
        Authorization: "Bearer " + auth.accessToken,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  // Get student by page
  const getStudentByPage = (page) => {
    console.log(page);
  };

  return (
    <View>
      <SearchBar page={"student"} />
      <label className="import-file mb-2" htmlFor="file">
        <span className="btn btn-warning">
          <i className="fa-solid fa-upload p-0 me-2"></i>
          Upload CSV
        </span>
        <input type="file" onChange={onFileChange} id="file" hidden />
        {csvFile && (
          <>
            <div className="d-flex flex-column align-items-start gap-2 mt-2">
              <p className="d-inline-block mb-0">
                <b>File name:</b> {csvFile}
              </p>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSubmitFile}
              >
                <i className="fa-solid fa-circle-arrow-up p-0 me-2"></i>
                Submit
              </button>
            </div>
          </>
        )}
      </label>
      <div className="overflow-auto">
        {isLoaded ? (
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>FPT ID</th>
                <th>Fullname</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Birthday</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.studentId}>
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
        ) : (
          <Loading />
        )}
      </div>
      <Pagination onClickPage={getStudentByPage} />
      {popup.isLoading && (
        <PopupConfirm message={popup.message} onPopup={confirmDelete} />
      )}
    </View>
  );
}

export default StudentView;
