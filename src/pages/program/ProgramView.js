import React, { useState, useEffect, useRef } from "react";
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

function ProgramView() {
  const [pageNumber, setPageNumber] = useState(0);
  const [programs, setPrograms] = useState([]);
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
  const programIdRef = useRef();

  // Call list of program
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/program/all?pageNumber=${pageNumber}`,
      headers,
    }).then((result) => {
      setIsLoaded(false);
      if (result) setPrograms(result.data);
      setIsLoaded(true);
    });
  }, []);

  // Handle delete program
  const handleDelete = (programId) => {
    handlePopup("Are you sure to delete?", true);
    programIdRef.current = programId;
  };

  // Confirm to delete role
  const confirmDelete = (choose) => {
    if (choose) {
      axios({
        method: "delete",
        url: `http://localhost:8080/program/delete/${programIdRef.current}`,
        headers,
      }).then((result) => {
        setIsLoaded(true);
        const newProgramList = [...programs];
        const index = programs.findIndex(
          (program) => program.programId === programIdRef.current
        );
        newProgramList.splice(index, 1);
        setPrograms(newProgramList);
      });
      handlePopup("", false);
      setIsLoaded(false);
    } else {
      handlePopup("", false);
    }
  };

  return (
    <View>
      <SearchBar page={"program"} />
      <div className="overflow-auto">
        {isLoaded ? (
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Program</th>
                <th>Description</th>
                <th>Created By</th>
                <th>Created Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program, i) => (
                <tr key={program.programId}>
                  <td>{i + 1}</td>
                  <td>{program.programName}</td>
                  <td>{program.description}</td>
                  <td>{program.createBy}</td>
                  <td>{new Date(program.createDate).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/program/view/detail/${program.programId}`}>
                      <i className="fa-solid fa-circle-info"></i>
                    </Link>
                    <Link to={`/program/update/${program.programId}`}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <button onClick={() => handleDelete(program.programId)}>
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

export default ProgramView;
