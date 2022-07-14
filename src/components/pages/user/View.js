import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { headers, cookies } from "../../headersToken";
import Pagination from "../../partials/Pagination";
import PopupConfirm from "../../partials/PopupConfirm";

function View() {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  let formData = new FormData();
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
  const userIdRef = useRef();

  // Get list user
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/users/all?pageNumber=${pageNumber}`,
      headers: {
        Authorization: "Bearer " + cookies.get("token"),
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    }).then((result) => {
      if (result) setUsers(result.data);
    });
  }, [pageNumber]);

  // Handle delete user
  const handleDelete = (userId) => {
    handlePopup("Are you sure to delete?", true);
    userIdRef.current = userId;
  };

  // Confirm to delete user
  const confirmDelete = (choose) => {
    if (choose) {
      axios({
        method: "delete",
        url: `http://localhost:8080/users/delete/${userIdRef.current}`,
        headers,
      }).then((result) => {
        const newUserList = [...users];
        const index = users.findIndex((user) => user.userId === userIdRef.current);
        newUserList.splice(index, 1);
        setUsers(newUserList);
      });
      handlePopup("", false);
    } else {
      handlePopup("", false);
    }
  };

  return (
    <div className="user-view">
      <div className="filter-area">
        <div className="filter-are__role col-6">
          <div className="user-dropdown dropdown d-flex">
            <label htmlFor="user">User</label>
            <button
              className="btn btn-info dropdown-toggle"
              type="button"
              id="role_dropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              User
            </button>
            <div className="dropdown-menu" aria-labelledby="role_dropdown">
              <Link className="dropdown-item" to="/">
                Manager
              </Link>
              <Link className="dropdown-item" to="/">
                Accoutant
              </Link>
              <Link className="dropdown-item" to="/">
                President
              </Link>
            </div>
          </div>
        </div>
        <div className="filter-area__major col-6">
          <div className="major-dropdown dropdown d-flex">
            <label htmlFor="major">Major</label>
            <button
              className="btn btn-info dropdown-toggle"
              type="button"
              id="major_dropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Major
            </button>
            <div className="dropdown-menu" aria-labelledby="major_dropdown">
              <Link className="dropdown-item" to="/">
                Manager
              </Link>
              <Link className="dropdown-item" to="/">
                Accoutant
              </Link>
              <Link className="dropdown-item" to="/">
                President
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-auto">
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Fullname</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user.userId}>
                <td>{i + 1}</td>
                <td>{user.username}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.departmentId.departmentName}</td>
                <td>
                  <Link to={`detail/${user.userId}`}>
                    <i className="fa-solid fa-circle-info"></i>
                  </Link>
                  <Link to={`../update/${user.userId}`}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                  <button onClick={() => handleDelete(user.userId)}>
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
      {popup.isLoading && (
        <PopupConfirm message={popup.message} onPopup={confirmDelete} />
      )}
    </div>
  );
}

export default View;
