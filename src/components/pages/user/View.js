import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { headers, cookies } from "../../headersToken";
import Pagination from "../../partials/Pagination";
import PopupConfirm from "../../partials/PopupConfirm";
import Loading from "../../partials/Loading/Loading";
import SearchBar from "../../partials/SearchBar";

function View() {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
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
      setIsLoaded(false);
      if (result) setUsers(result.data);
      setIsLoaded(true);
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
        setIsLoaded(true);
        const newUserList = [...users];
        const index = users.findIndex(
          (user) => user.userId === userIdRef.current
        );
        newUserList.splice(index, 1);
        setUsers(newUserList);
      });
      handlePopup("", false);
      setIsLoaded(false);
    } else {
      handlePopup("", false);
    }
  };

  return (
    <div className="user-view">
      <SearchBar page={"user"} />
      <div className="overflow-auto">
        {isLoaded ? (
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
