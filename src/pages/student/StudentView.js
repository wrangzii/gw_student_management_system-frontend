import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import View from "~/components/crud/View";
import { headers } from "~/utils/headersToken";
import { Pagination, PopupConfirm, Loading, SearchBar } from "~/components";
import { usePagination } from "~/store/pagination";

function StudentView() {
  const [students, setStudents] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [csvFile, setCsvFile] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const fileRef = useRef();
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
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/student/all?pageNumber=${
        pagination.pageNumber !== undefined ? pagination.pageNumber : 0
      }`,
      headers,
    })
      .then((result) => {
        setIsLoaded(false);
        if (result) setStudents(result.data);
        setIsLoaded(true);
      })
      .catch((error) => console.log(error));
  }, [pagination.pageNumber]);

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
  let formData = new FormData();
  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (e.target && file) {
      formData.append("file", file);
      setCsvFile(file.name);
      setSelectedFile(fileRef.current?.value);
      console.log(file);
    }
  };

  // Handle submit file
  const handleSubmitFile = () => {
    axios({
      method: "post",
      url: "http://localhost:8080/student/insert/file",
      data: formData,
      headers,
    }).then((result) => console.log(result));
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <View>
      <SearchBar page={"student"} />
      <label className="import-file mb-2" htmlFor="file">
        <span className="btn btn-warning">
          <i className="fa-solid fa-upload p-0 me-2"></i>
          Upload CSV
        </span>
        <input
          type="file"
          onChange={onFileChange}
          id="file"
          hidden
          ref={fileRef}
        />
        {selectedFile && (
          <>
            <div className="d-flex align-items-center gap-2">
              <p className="d-inline-block mb-0">
                <b>File name:</b> {csvFile}
              </p>
              <button className="btn btn-danger" onClick={removeFile}>
                &times;
              </button>
              <button className="btn btn-success" onClick={handleSubmitFile}>
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
        ) : (
          <Loading />
        )}
      </div>
      <Pagination />
      {popup.isLoading && (
        <PopupConfirm message={popup.message} onPopup={confirmDelete} />
      )}
    </View>
  );
}

export default StudentView;
