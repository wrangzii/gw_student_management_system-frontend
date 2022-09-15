import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import View from "~/components/crud/View";
import {
  Pagination,
  PopupConfirm,
  Loading,
  SearchBar,
  Message,
} from "~/components";
import { usePagination } from "~/store/pagination";
import httpRequest from "~/utils/httpRequest";
import UploadCSV from "./uploadCSV";
import UploadGrade from "./uploadGrade";

function StudentView() {
  const [students, setStudents] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { pagination } = usePagination();
  const [msgStatus, setMsgStatus] = useState({
    msg: "",
    isSuccess: false,
  });
  const handleMsgStatus = (msg, isSuccess) => {
    setMsgStatus({
      msg,
      isSuccess,
    });
  };
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
  const [valueSearch, setValueSearch] = useState("");

  // Call list of student
  const callListStudent = () => {
    const pageNumber =
      pagination.pageNumber !== undefined ? pagination.pageNumber : 1;
    httpRequest
      .get(`student/all?pageNumber=${pageNumber}`)
      .then((result) => {
        setStudents(result?.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  };

  useEffect(() => {
    setIsLoaded(false);
    callListStudent();
  }, [pagination.pageNumber]);

  // Handle delete student
  const handleDelete = (studentId) => {
    handlePopup("Are you sure to delete?", true);
    studentIdRef.current = studentId;
  };

  // Confirm to delete student
  const confirmDelete = (choose) => {
    if (choose) {
      httpRequest
        .delete(`student/delete/${studentIdRef.current}`)
        .then((result) => {
          setIsLoaded(true);
          const newStudentList = [...students];
          const index = students.findIndex(
            (student) => student.studentId === studentIdRef.current
          );
          newStudentList.splice(index, 1);
          setStudents(newStudentList);
          handleMsgStatus(result?.data?.message, true);
        })
        .catch((error) => {
          console.log(error);
          setIsLoaded(true);
        });
      handlePopup("", false);
      setIsLoaded(false);
    } else {
      handlePopup("", false);
    }
  };

  // Search
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (valueSearch.trim() === "") callListStudent();
    setIsLoaded(false);
    httpRequest
      .get(`student/name?name=${valueSearch}`)
      .then((result) => {
        setStudents(result?.data?.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  };

  return (
    <View>
      <SearchBar
        page={"student"}
        onInputSearch={(e) => setValueSearch(e.target.value)}
        onSubmitSearch={handleSubmitSearch}
      />
      <UploadCSV />
      <UploadGrade />
      {msgStatus.isSuccess && (
        <Message
          isSuccess={msgStatus.isSuccess}
          msg={msgStatus.msg}
          onCloseMsg={() => setMsgStatus("", false)}
        />
      )}
      <Pagination pageName={"student"} />
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
      {popup.isLoading && (
        <PopupConfirm message={popup.message} onPopup={confirmDelete} />
      )}
    </View>
  );
}

export default StudentView;
