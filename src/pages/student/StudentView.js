import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

import View from "~/components/crud/View";
import { Pagination, PopupConfirm, Loading, Message } from "~/components";
import { usePagination } from "~/store/pagination";
import httpRequest from "~/utils/httpRequest";
import UploadCSV from "./uploadCSV";
import UploadGrade from "./uploadGrade";
import FilterSearch from "~/components/filterSearch/FilterSearch";

import "./studentView.scss";

function StudentView() {
  const [students, setStudents] = useState([]);
  const [majorIdList, setMajorIdList] = useState([]);
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
  const initalValue = {
    fullName: "",
    majorId: "",
    fptId: "",
    uogId: "",
    personId: "",
    gender: "",
    email: "",
  };
  const [value, setValue] = useState(initalValue);

  const currentPage = pagination.pageNumber;

  // Call list of student
  const callListStudent = () => {
    const pageNumber = currentPage !== undefined ? currentPage : 1;
    httpRequest
      .get(`student/all?pageNumber=${pageNumber}`)
      .then((result) => {
        const data = result?.data;
        setStudents(data?.data);
        if (data?.data !== null) setPageCount(data?.pageNumber - 1);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  };

  // Call list major
  const callListMajor = () => {
    const pageNumber = 0;
    httpRequest
      .get(`major/all?pageNumber=${pageNumber}`)
      .then((result) => {
        const data = result?.data;
        setMajorIdList(data?.data);
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
    callListMajor();
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

  // Handle search major
  const handleSearchMajor = (id) => {
    httpRequest
      .get(`major/filter?pageNumber=0&search=majorId:${id}`)
      .then((result) => console.log(result));
  };

  // handle change Filter Search
  const handleChangeFilterSearch = (e) => {
    if (e.target.name === "majorId") handleSearchMajor(e.target.value);
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  // Search
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    const myQuery = () => {
      let myQueryArr = [];
      if (value?.fullName) myQueryArr.push(`fullName:*${value.fullName}`);
      if (value?.majorId) myQueryArr.push(`majorId:${value.majorId}`);
      if (value?.fptId) myQueryArr.push(`fptId:*${value.fptId}`);
      if (value?.uogId) myQueryArr.push(`uogId:*${value.uogId}`);
      if (value?.personId) myQueryArr.push(`personId:*${value.personId}`);
      if (value?.gender) myQueryArr.push(`gender:${value.gender}`);
      if (value?.email) myQueryArr.push(`email:*${value.email}`);
      return myQueryArr.join(",");
    };

    httpRequest
      .get(`student/filter?pageNumber=0&search=${myQuery()}`)
      .then((result) => {
        const data = result?.data;
        setStudents(data?.data);
        if (data?.data !== null) setPageCount(data.pageNumber);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  };

  // Reset filter search
  const handleResetFilter = useCallback(() => {
    setValue(initalValue);
  }, []);

  return (
    <View>
      <FilterSearch
        onInputSearch={handleChangeFilterSearch}
        onSubmitSearch={handleSubmitSearch}
        onResetFilter={handleResetFilter}
        majorIdList={majorIdList}
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
              {students?.map((student) => (
                <tr key={student.fptId}>
                  <td>{student.fptId}</td>
                  <td>{student.fullName}</td>
                  <td>{student.gender}</td>
                  <td>{student.email}</td>
                  <td>{new Date(student.dob).toLocaleDateString()}</td>
                  <td>
                    <button className="import-grade-btn text-light">
                      <i className="fa-solid fa-file-import"></i>
                      <div className="tooltip-grade">
                        <Link
                          className="btn btn-primary"
                          to={`detail/${student.fptId}/import-grade`}
                        >
                          Import grade
                        </Link>
                        <Link
                          className="btn btn-info"
                          to={`detail/${student.fptId}/view-grade`}
                        >
                          View grade
                        </Link>
                      </div>
                    </button>
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
