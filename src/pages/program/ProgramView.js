import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import {
  Pagination,
  PopupConfirm,
  Loading,
  SearchBar,
  Message,
} from "~/components";
import View from "~/components/crud/View";
import httpRequest from "~/utils/httpRequest";
import { usePagination } from "~/store/pagination";

function ProgramView() {
  const [programs, setPrograms] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  // const { pagination } = usePagination();
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
  const programIdRef = useRef();

  // Call list of program
  const callListProgram = () => {
    const pageNumber = 0;
    // pagination.pageNumber !== undefined ? pagination.pageNumber : 0;
    httpRequest
      .get(`program/all?pageNumber=${pageNumber}`)
      .then((result) => {
        const data = result?.data;
        setPrograms(data?.data);
        setPageCount(data?.pageNumber);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  };
  useEffect(() => {
    setIsLoaded(false);
    callListProgram();
  }, [pageCount]);

  // Handle delete program
  const handleDelete = (programId) => {
    handlePopup("Are you sure to delete?", true);
    programIdRef.current = programId;
  };

  // Confirm to delete role
  const confirmDelete = (choose) => {
    if (choose) {
      httpRequest
        .delete(`program/delete/${programIdRef.current}`)
        .then((result) => {
          setIsLoaded(true);
          const newProgramList = [...programs];
          const index = programs.findIndex(
            (program) => program.programId === programIdRef.current
          );
          newProgramList.splice(index, 1);
          setPrograms(newProgramList);
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

  return (
    <View>
      <SearchBar page={"program"} />
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
      {popup.isLoading && (
        <PopupConfirm message={popup.message} onPopup={confirmDelete} />
      )}
    </View>
  );
}

export default ProgramView;
