import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { Loading, PopupConfirm } from "~/components";
import ViewDetail from "~/components/crud/ViewDetail";
import httpRequest from "~/utils/httpRequest";

function StudentClassViewDetail() {
  const { id } = useParams();
  const [viewDetail, setViewDetail] = useState([]);
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
  const fptIdRef = useRef();

  // Get class's detail info
  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`studentClass/${id}`)
      .then((result) => {
        setViewDetail(result?.data?.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  }, []);

  // Handle delete student
  const handleDelete = (fptId) => {
    handlePopup("Are you sure to delete?", true);
    fptIdRef.current = fptId;
  };

  // Confirm to delete student
  const confirmDelete = (choose) => {
    if (choose) {
      httpRequest
        .delete(`studentClass/delete/${id}/${fptIdRef.current}`)
        .then((result) => {
          setIsLoaded(true);
          const newStudentList = [...viewDetail];
          const index = viewDetail.findIndex(
            (student) => student.fptId === fptIdRef.current
          );
          newStudentList.splice(index, 1);
          setViewDetail(newStudentList);
          // handleMsgStatus(result?.data?.message, true);
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

  return (
    <ViewDetail>
      {isLoaded ? (
        <>
          <h6>Class: {id}</h6>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>FPT ID</th>
                <th>Fullname</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {viewDetail.map((cls, index) => (
                <tr key={index}>
                  <td>{cls.fptId}</td>
                  <td>{cls.fullName}</td>
                  <td>
                    <button
                      className="border-0"
                      onClick={() => handleDelete(cls.fptId)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <Loading />
      )}
      {popup.isLoading && (
        <PopupConfirm message={popup.message} onPopup={confirmDelete} />
      )}
    </ViewDetail>
  );
}

export default StudentClassViewDetail;
