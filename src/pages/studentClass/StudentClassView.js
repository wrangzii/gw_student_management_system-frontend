import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import View from "~/components/crud/View";
import {
  Pagination,
  PopupConfirm,
  Loading,
  SearchBar,
  Message,
} from "~/components";
import httpRequest from "~/utils/httpRequest";
import { usePagination } from "~/store/pagination";

function StudentClassView() {
  const [studentClass, setStudentClass] = useState([]);
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
  const [valueSearch, setValueSearch] = useState("");
  const classIdRef = useRef();

  // Call list of class
  const callListClasss = () => {
    const pageNumber =
      pagination.pageNumber !== undefined ? pagination.pageNumber : 0;
    httpRequest
      .get(`studentClass/all?pageNumber=${pageNumber}`)
      .then((result) => {
        const data = result?.data;
        setStudentClass(data);
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
    callListClasss();
  }, [pagination.pageNumber]);

  // Handle delete class
  const handleDelete = (classId) => {
    handlePopup("Are you sure to delete?", true);
    classIdRef.current = classId;
  };

  // Confirm to delete role
  // const confirmDelete = (choose) => {
  //   if (choose) {
  //     httpRequest
  //       .delete(`class/delete/${classIdRef.current}`)
  //       .then((result) => {
  //         setIsLoaded(true);
  //         const newClassList = [...classes];
  //         const index = classes.findIndex(
  //           (class) => class.classId === classIdRef.current
  //         );
  //         newClassList.splice(index, 1);
  //         setClasss(newClassList);
  //         handleMsgStatus(result?.data?.message, true);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         setIsLoaded(true);
  //       });
  //     handlePopup("", false);
  //     setIsLoaded(false);
  //   } else {
  //     handlePopup("", false);
  //   }
  // };

  // Search
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (valueSearch.trim() === "") callListClasss();
    setIsLoaded(false);
    httpRequest
      .get(`class/name?name=${valueSearch}`)
      .then((result) => {
        setStudentClass(result?.data?.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  };

  return (
    <View>
      <SearchBar
        page={"class"}
        onInputSearch={(e) => setValueSearch(e.target.value)}
        onSubmitSearch={handleSubmitSearch}
      />
      {msgStatus.isSuccess && (
        <Message
          isSuccess={msgStatus.isSuccess}
          msg={msgStatus.msg}
          onCloseMsg={() => handleMsgStatus("", false)}
        />
      )}
      <Pagination pageCount={pageCount} />
      <div className="overflow-auto">
        {isLoaded ? (
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Class</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {studentClass?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.studentClassId.classCode}</td>
                  <td>
                    <Link to={`detail/${item.studentClassId.classCode}`}>
                      <i className="fa-solid fa-circle-info"></i>
                    </Link>
                    <Link to={`/class/update/${item.classId}`}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <button onClick={() => handleDelete(item.classId)}>
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
      {/* {popup.isLoading && (
        <PopupConfirm message={popup.message} onPopup={confirmDelete} />
      )} */}
    </View>
  );
}

export default StudentClassView;
