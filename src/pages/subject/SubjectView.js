import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import { headers } from "~/utils/headersToken";
import {
  Pagination,
  PopupConfirm,
  Loading,
  SearchBar,
  Message,
} from "~/components";

import View from "~/components/crud/View";
import httpRequest from "~/utils/httpRequest";

function SubjectView() {
  const [subjects, setSubjects] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
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
  const subjectIdRef = useRef();

  // Call list of subject
  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`subject/all?pageNumber=${pageNumber}`)
      .then((result) => {
        setSubjects(result?.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  }, [pageNumber]);

  // Handle delete subject
  const handleDelete = (subjectId) => {
    handlePopup("Are you sure to delete?", true);
    subjectIdRef.current = subjectId;
  };

  // Confirm to delete role
  const confirmDelete = (choose) => {
    if (choose) {
      httpRequest
        .delete(`subject/delete/${subjectIdRef.current}`)
        .then((result) => {
          setIsLoaded(true);
          const newSubjectList = [...subjects];
          const index = subjects.findIndex(
            (subject) => subject.subjectId === subjectIdRef.current
          );
          newSubjectList.splice(index, 1);
          setSubjects(newSubjectList);
          handleMsgStatus(result?.data?.message, true);
        });
      handlePopup("", false);
      setIsLoaded(false);
    } else {
      handlePopup("", false);
    }
  };

  return (
    <View>
      <SearchBar page={"subject"} />
      {msgStatus.isSuccess && (
        <Message
          isSuccess={msgStatus.isSuccess}
          msg={msgStatus.msg}
          onCloseMsg={() => setMsgStatus("", false)}
        />
      )}
      <div className="overflow-auto">
        {isLoaded ? (
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Subject</th>
                <th>Subject Code</th>
                <th>Description</th>
                <th>Replace With</th>
                <th>Created Date</th>
                <th>Created By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, i) => (
                <tr key={subject.subjectId}>
                  <td>{i + 1}</td>
                  <td>{subject.subjectName}</td>
                  <td>{subject.subjectCode}</td>
                  <td>{subject.description}</td>
                  <td>{subject.replaceWith}</td>
                  <td>{new Date(subject.createDate).toLocaleDateString()}</td>
                  <td>{subject.createBy}</td>
                  <td>
                    <Link to={`detail/${subject.subjectId}`}>
                      <i className="fa-solid fa-circle-info"></i>
                    </Link>
                    <Link to={`/subject/update/${subject.subjectId}`}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <button onClick={() => handleDelete(subject.subjectId)}>
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
        {popup.isLoading && (
          <PopupConfirm message={popup.message} onPopup={confirmDelete} />
        )}
      </div>
      <Pagination />
    </View>
  );
}

export default SubjectView;
