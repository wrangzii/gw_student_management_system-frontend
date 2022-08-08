import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import { headers } from "~/utils/headersToken";
import {
  Pagination,
  PopupConfirm,
  Loading,
  SearchBar,
} from "~/components/partials";

import View from "~/components/partials/crud/View";

function MajorView() {
  const [majors, setMajors] = useState([]);
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

  // Call list of major
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/major/all?pageNumber=${pageNumber}`,
      headers,
    })
      .then((result) => {
        setIsLoaded(false);
        if (result) {
          setMajors(result.data);
        }
        setIsLoaded(true);
      })
      .catch((error) => console.log(error));
  }, [pageNumber]);

  // Handle delete major
  const handleDelete = (majorId) => {
    handlePopup("Are you sure to delete?", true);
    majorIdRef.current = majorId;
  };

  // Confirm to delete role
  const confirmDelete = (choose) => {
    if (choose) {
      axios({
        method: "delete",
        url: `http://localhost:8080/major/delete/${majorIdRef.current}`,
        headers,
      }).then((result) => {
        setIsLoaded(true);
        const newMajorList = [...majors];
        const index = majors.findIndex(
          (major) => major.majorId === majorIdRef.current
        );
        newMajorList.splice(index, 1);
        setMajors(newMajorList);
      });
      handlePopup("", false);
      setIsLoaded(false);
    } else {
      handlePopup("", false);
    }
  };

  return (
    <View>
      <SearchBar page={"major"} />
      <div className="overflow-auto">
        {isLoaded ? (
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>V_Major Name</th>
                <th>E_Major Name</th>
                <th>Major Code</th>
                <th>Created Date</th>
                <th>Created By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {majors.map((major, i) => (
                <tr key={major.majorId}>
                  <td>{i + 1}</td>
                  <td>{major.vname}</td>
                  <td>{major.ename}</td>
                  <td>{major.majorCode}</td>
                  <td>{new Date(major.createDate).toLocaleDateString()}</td>
                  <td>{major.createBy}</td>
                  <td>
                    <Link to={`detail/${major.majorId}`}>
                      <i className="fa-solid fa-circle-info"></i>
                    </Link>
                    <Link to={`/major/update/${major.majorId}`}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <button onClick={() => handleDelete(major.majorId)}>
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
