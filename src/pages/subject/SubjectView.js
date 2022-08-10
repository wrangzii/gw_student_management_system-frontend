import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import { headers } from "~/utils/headersToken";
import {
  Pagination,
  PopupConfirm,
  Loading,
  SearchBar,
} from "~/components";

import View from "~/components/crud/View";

function SubjectView() {
  const [subjects, setSubjects] = useState([]);
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
  const subjectIdRef = useRef();

  // Call list of subject
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/subject/all?pageNumber=${pageNumber}`,
      headers,
    })
      .then((result) => {
        setIsLoaded(false);
        if (result) {
          setSubjects(result.data);
        }
        setIsLoaded(true);
      })
      .catch((error) => console.log(error));
  }, [pageNumber]);

  // Handle delete subject
  const handleDelete = (subjectId) => {
    handlePopup("Are you sure to delete?", true);
    subjectIdRef.current = subjectId;
  };

  // Confirm to delete role
  const confirmDelete = (choose) => {
    if (choose) {
      axios({
        method: "delete",
        url: `http://localhost:8080/subject/delete/${subjectIdRef.current}`,
        headers,
      }).then((result) => {
        setIsLoaded(true);
        const newSubjectList = [...subjects];
        const index = subjects.findIndex(
          (subject) => subject.subjectId === subjectIdRef.current
        );
        newSubjectList.splice(index, 1);
        setSubjects(newSubjectList);
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
        <Pagination />
        {popup.isLoading && (
          <PopupConfirm message={popup.message} onPopup={confirmDelete} />
        )}
      </div>
    </View>
  );
}

export default SubjectView;
