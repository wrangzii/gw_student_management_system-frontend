import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { headers } from "~/components/headersToken";
import {
  Pagination,
  PopupConfirm,
  Loading,
  SearchBar,
} from "~/components/partials";

function View() {
  const [roles, setRoles] = useState([]);
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
  const roleIdRef = useRef();

  // Call list of role
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/role/all?pageNumber=${pageNumber}`,
      headers,
    })
      .then((result) => {
        setIsLoaded(false);
        if (result) setRoles(result.data);
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
      axios({
        method: "delete",
        url: `http://localhost:8080/role/delete/${roleIdRef.current}`,
        headers,
      }).then((result) => {
        setIsLoaded(true);
        const newRoleList = [...roles];
        const index = roles.findIndex(
          (role) => role.roleId === roleIdRef.current
        );
        newRoleList.splice(index, 1);
        setRoles(newRoleList);
      });
      handlePopup("", false);
      setIsLoaded(false);
    } else {
      handlePopup("", false);
    }
  };

  return (
    <div className="role-view position-relative">
      <SearchBar page={"role"} />
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
              {roles.map((role, i) => (
                <tr key={role.roleId}>
                  <td>{i + 1}</td>
                  <td>{role.roleName}</td>
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
      <Pagination />
      {popup.isLoading && (
        <PopupConfirm message={popup.message} onPopup={confirmDelete} />
      )}
    </div>
  );
}

export default View;
