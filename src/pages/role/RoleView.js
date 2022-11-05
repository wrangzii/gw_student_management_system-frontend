import React, { useEffect, useState, useRef } from "react";
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

function RoleView() {
  const [roles, setRoles] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState(1);
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
  const roleIdRef = useRef();

  // Call list of role
  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`role/all?pageNumber=${pageNumber}`)
      .then((result) => {
        setRoles(result?.data);
        setIsLoaded(true);
      })
      .catch((error) => console.log(error));
  }, [pageNumber]);

  // Handle delete role
  const handleDelete = (roleId) => {
    handlePopup("Are you sure to delete?", true);
    roleIdRef.current = roleId;
  };

  // Confirm to delete role
  const confirmDelete = (choose) => {
    if (choose) {
      httpRequest
        .delete(`role/delete/${roleIdRef.current}`)
        .then((result) => {
          setIsLoaded(true);
          const newRoleList = [...roles];
          const index = roles.findIndex(
            (role) => role.roleId === roleIdRef.current
          );
          newRoleList.splice(index, 1);
          setRoles(newRoleList);
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
      <SearchBar page={"role"} />
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
                <th>Role</th>
                <th>Description</th>
                <th>Created Date</th>
                <th>Created By</th>
                <th>Modified Date</th>
                <th>Modified By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {roles?.map((role, i) => (
                <tr key={role.roleId}>
                  <td>{i + 1}</td>
                  <td>{role.roleName.slice(5)}</td>
                  <td>{role.description}</td>
                  <td>{new Date(role.createDate).toLocaleDateString()}</td>
                  <td>{role.createBy}</td>
                  <td>{new Date(role.modifyDate).toLocaleDateString()}</td>
                  <td>{role.modifyBy}</td>
                  <td>
                    <Link to={`detail/${role.roleId}`}>
                      <i className="fa-solid fa-circle-info"></i>
                    </Link>
                    <Link to={`/role/update/${role.roleId}`}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <button onClick={() => handleDelete(role.roleId)}>
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

export default RoleView;
