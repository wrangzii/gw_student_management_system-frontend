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

function TermView() {
  const [terms, setTerms] = useState([]);
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
  const termIdRef = useRef();

  // Call list of term
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/term/all?pageNumber=${pageNumber}`,
      headers,
    })
      .then((result) => {
        setIsLoaded(false);
        if (result) {
          setTerms(result.data);
        }
        setIsLoaded(true);
      })
      .catch((error) => console.log(error));
  }, [pageNumber]);

  // Handle delete term
  const handleDelete = (termId) => {
    handlePopup("Are you sure to delete?", true);
    termIdRef.current = termId;
  };

  // Confirm to delete role
  const confirmDelete = (choose) => {
    if (choose) {
      axios({
        method: "delete",
        url: `http://localhost:8080/term/delete/${termIdRef.current}`,
        headers,
      }).then((result) => {
        setIsLoaded(true);
        const newTermList = [...terms];
        const index = terms.findIndex(
          (term) => term.termId === termIdRef.current
        );
        newTermList.splice(index, 1);
        setTerms(newTermList);
      });
      handlePopup("", false);
      setIsLoaded(false);
    } else {
      handlePopup("", false);
    }
  };

  return (
    <View>
      <SearchBar page={"term"} />
      <div className="overflow-auto">
        {isLoaded ? (
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Term</th>
                <th>Term Code</th>
                <th>Description</th>
                <th>Created Date</th>
                <th>Created By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {terms.map((term, i) => (
                <tr key={term.termId}>
                  <td>{i + 1}</td>
                  <td>{term.termName}</td>
                  <td>{term.termCode}</td>
                  <td>{term.description}</td>
                  <td>{new Date(term.createDate).toLocaleDateString()}</td>
                  <td>{term.createBy}</td>
                  <td>
                    <Link to={`detail/${term.termId}`}>
                      <i className="fa-solid fa-circle-info"></i>
                    </Link>
                    <Link to={`/term/update/${term.termId}`}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <button onClick={() => handleDelete(term.termId)}>
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

export default TermView;
