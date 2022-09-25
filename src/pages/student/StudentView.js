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
import FilterSearch from "~/components/filterSearch/FilterSearch";

function StudentView() {
  const [students, setStudents] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { pagination } = usePagination();
  const [pageCount, setPageCount] = useState(1);
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
  const fptIdRef = useRef();
  const [valueSearch, setValueSearch] = useState("");

  const currentPage = pagination.pageNumber;

  // Call list of student
  const callListStudent = () => {
    const pageNumber = currentPage !== undefined ? currentPage : 1;
    httpRequest
      .get(`student/all?pageNumber=${pageNumber}`)
      .then((result) => {
        const data = result?.data;
        setStudents(data?.data);
        setPageCount(data?.pageNumber - 1);
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
  }, [currentPage]);

  // Handle delete student
  const handleDelete = (fptId) => {
    handlePopup("Are you sure to delete?", true);
    fptIdRef.current = fptId;
  };

  // Confirm to delete student
  const confirmDelete = (choose) => {
    if (choose) {
      httpRequest
        .delete(`student/delete/${fptIdRef.current}`)
        .then((result) => {
          setIsLoaded(true);
          const newStudentList = [...students];
          const index = students.findIndex(
            (student) => student.fptId === fptIdRef.current
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
    const pageNumber =
      pagination.pageNumber === undefined ? 0 : pagination.pageNumber;
    httpRequest
      .get(
        `student/filter?pageNumber=${pageNumber}&search=fullName:*${valueSearch}`
      )
      .then((result) => {
        setStudents(result?.data);
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
      <FilterSearch />
      <UploadCSV />
      <UploadGrade />
      {msgStatus.isSuccess && (
        <Message
          isSuccess={msgStatus.isSuccess}
          msg={msgStatus.msg}
          onCloseMsg={() => setMsgStatus("", false)}
        />
      )}
      <Pagination pageCount={pageCount} />
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
                <tr key={student.fptId}>
                  <td>{student.fptId}</td>
                  <td>{student.fullName}</td>
                  <td>{student.gender}</td>
                  <td>{student.email}</td>
                  <td>{new Date(student.dob).toLocaleDateString()}</td>
                  <td>
                    <Link to={`detail/${student.fptId}`}>
                      <i className="fa-solid fa-circle-info"></i>
                    </Link>
                    <Link to={`../update/${student.fptId}`}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <button onClick={() => handleDelete(student.fptId)}>
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
