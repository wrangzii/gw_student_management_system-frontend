import React, { useEffect, useRef, useState } from "react";
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
// import { usePagination } from "~/store/pagination";

function MajorView() {
  const [majors, setMajors] = useState([]);
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
  const majorIdRef = useRef();

  // Call list of major
  const callListMajor = () => {
    const pageNumber = 0;
    // pagination.pageNumber !== undefined ? pagination.pageNumber : 0;
    httpRequest
      .get(`major/all?pageNumber=${pageNumber}`)
      .then((result) => {
        const data = result?.data;
        setMajors(data?.data);
        if (data?.data !== null) setPageCount(data?.pageNumber);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  };

  useEffect(() => {
    setIsLoaded(false);
    callListMajor();
  }, [pageCount]);

  // Handle delete major
  const handleDelete = (majorId) => {
    handlePopup("Are you sure to delete?", true);
    majorIdRef.current = majorId;
  };

  // Confirm to delete role
  const confirmDelete = (choose) => {
    if (choose) {
      httpRequest
        .delete(`major/delete/${majorIdRef.current}`)
        .then((result) => {
          setIsLoaded(true);
          const newMajorList = [...majors];
          const index = majors.findIndex(
            (major) => major.majorId === majorIdRef.current
          );
          newMajorList.splice(index, 1);
          setMajors(newMajorList);
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
      <SearchBar page={"major"} />
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
                <th>V_Major Name</th>
                <th>E_Major Name</th>
                <th>Major Code</th>
                <th>Created Date</th>
                <th>Created By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {majors?.map((major, i) => (
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
        {popup.isLoading && (
          <PopupConfirm message={popup.message} onPopup={confirmDelete} />
        )}
      </div>
    </View>
  );
}

export default MajorView;
