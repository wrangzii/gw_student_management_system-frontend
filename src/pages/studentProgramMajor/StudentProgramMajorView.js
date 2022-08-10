import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import { headers } from "~/utils/headersToken";
import { Pagination, PopupConfirm, Loading, SearchBar } from "~/components";

import View from "~/components/crud/View";

function MajorView() {
  const [studentProgramMajors, setStudentProgramMajors] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
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
  const majorIdRef = useRef();

  // Call list of studentProgramMajor
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/studentProgramMajor/all?pageNumber=${pageNumber}`,
      headers,
    })
      .then((result) => {
        setIsLoaded(false);
        if (result) {
          setStudentProgramMajors(result.data);
        }
        setIsLoaded(true);
      })
      .catch((error) => console.log(error));
  }, [pageNumber]);

  // Handle delete studentProgramMajor
  const handleDelete = (majorId) => {
    handlePopup("Are you sure to delete?", true);
    majorIdRef.current = majorId;
  };

  // Confirm to delete role
  const confirmDelete = (choose) => {
    if (choose) {
      axios({
        method: "delete",
        url: `http://localhost:8080/studentProgramMajor/delete/${majorIdRef.current}`,
        headers,
      }).then((result) => {
        setIsLoaded(true);
        const newMajorList = [...studentProgramMajors];
        const index = studentProgramMajors.findIndex(
          (studentProgramMajor) =>
            studentProgramMajor.majorId === majorIdRef.current
        );
        newMajorList.splice(index, 1);
        setStudentProgramMajors(newMajorList);
      });
      handlePopup("", false);
      setIsLoaded(false);
    } else {
      handlePopup("", false);
    }
  };

  return (
    <View>
      <SearchBar page={"studentProgramMajor"} />
      <div className="overflow-auto">
        {isLoaded ? (
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>V_Major Name</th>
                <th>E_Major Name</th>
                <th>studentProgramMajor Code</th>
                <th>Created Date</th>
                <th>Created By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {studentProgramMajors.map((studentProgramMajor, i) => (
                <tr key={studentProgramMajor.majorId}>
                  <td>{i + 1}</td>
                  <td>{studentProgramMajor.vname}</td>
                  <td>{studentProgramMajor.ename}</td>
                  <td>{studentProgramMajor.majorCode}</td>
                  <td>
                    {new Date(
                      studentProgramMajor.createDate
                    ).toLocaleDateString()}
                  </td>
                  <td>{studentProgramMajor.createBy}</td>
                  <td>
                    <Link to={`detail/${studentProgramMajor.majorId}`}>
                      <i className="fa-solid fa-circle-info"></i>
                    </Link>
                    <Link
                      to={`/studentProgramMajor/update/${studentProgramMajor.majorId}`}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <button
                      onClick={() => handleDelete(studentProgramMajor.majorId)}
                    >
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
        <Pagination />
        {popup.isLoading && (
          <PopupConfirm message={popup.message} onPopup={confirmDelete} />
        )}
      </div>
    </View>
  );
}

export default MajorView;
