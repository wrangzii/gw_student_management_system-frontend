import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import httpRequest from "~/utils/httpRequest";

import View from "~/components/crud/View";
import {
  Pagination,
  PopupConfirm,
  Loading,
  SearchBar,
  Message,
} from "~/components";

function DepartmentView() {
  const [departments, setDepartments] = useState([]);
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
  const departmentIdRef = useRef();

  // Call list of department
  useEffect(() => {
    httpRequest
      .get(`department/all?pageNumber=${pageNumber}`)
      .then((result) => {
        setIsLoaded(false);
        setDepartments(result?.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  }, [pageNumber]);

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
        });
      handlePopup("", false);
      setIsLoaded(false);
    } else {
      handlePopup("", false);
    }
  };

  return (
    <View>
      <SearchBar page={"department"} />
      {msgStatus.isSuccess && (
        <Message
          isSuccess={msgStatus.isSuccess}
          msg={msgStatus.msg}
          onCloseMsg={() => handleMsgStatus("", false)}
        />
      )}
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
              {departments.map((department, i) => (
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
        <Pagination items={departments} />
        {popup.isLoading && (
          <PopupConfirm message={popup.message} onPopup={confirmDelete} />
        )}
      </div>
    </View>
  );
}

export default DepartmentView;