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
// import { usePagination } from "~/store/pagination";

function DepartmentView() {
  const [departments, setDepartments] = useState([]);
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
  const [valueSearch, setValueSearch] = useState("");
  const departmentIdRef = useRef();

  // Call list of department
  const callListDepartments = () => {
    const pageNumber = 0
      // pagination.pageNumber !== undefined ? pagination.pageNumber : 0;
    httpRequest
      .get(`department/all?pageNumber=${pageNumber}`)
      .then((result) => {
        const data = result?.data;
        setDepartments(data?.data);
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
    callListDepartments();
  }, [pageCount]);

  // Handle delete department
  const handleDelete = (departmentId) => {
    handlePopup("Are you sure to delete?", true);
    departmentIdRef.current = departmentId;
  };

  // Confirm to delete role
  const confirmDelete = (choose) => {
    if (choose) {
      httpRequest
        .delete(`department/delete/${departmentIdRef.current}`)
        .then((result) => {
          setIsLoaded(true);
          const newDepartmentList = [...departments];
          const index = departments.findIndex(
            (department) => department.departmentId === departmentIdRef.current
          );
          newDepartmentList.splice(index, 1);
          setDepartments(newDepartmentList);
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

  // Search
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (valueSearch.trim() === "") callListDepartments();
    setIsLoaded(false);
    httpRequest
      .get(`department/name?name=${valueSearch}`)
      .then((result) => {
        setDepartments(result?.data?.data);
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
        page={"department"}
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
                <th>Department</th>
                <th>Description</th>
                <th>Created Date</th>
                <th>Created By</th>
                <th>Modified Date</th>
                <th>Modified By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {departments?.map((department, i) => (
                <tr key={department.departmentId}>
                  <td>{i + 1}</td>
                  <td>{department.departmentName}</td>
                  <td>{department.description}</td>
                  <td>
                    {new Date(department.createDate).toLocaleDateString()}
                  </td>
                  <td>{department.createBy}</td>
                  <td>
                    {new Date(department.modifyDate).toLocaleDateString()}
                  </td>
                  <td>{department.modifyBy}</td>
                  <td>
                    <Link to={`detail/${department.departmentId}`}>
                      <i className="fa-solid fa-circle-info"></i>
                    </Link>
                    <Link to={`/department/update/${department.departmentId}`}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <button
                      onClick={() => handleDelete(department.departmentId)}
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
      </div>
      {popup.isLoading && (
        <PopupConfirm message={popup.message} onPopup={confirmDelete} />
      )}
    </View>
  );
}

export default DepartmentView;
