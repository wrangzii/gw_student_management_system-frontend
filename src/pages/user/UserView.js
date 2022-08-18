import React, { useEffect, useState, useRef } from "react";
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

function UserView() {
  const [users, setUsers] = useState([]);
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
  const userIdRef = useRef();

  // Get list user
  useEffect(() => {
    httpRequest
      .get(`users/all?pageNumber=${pageNumber}`)
      .then((result) => {
        setUsers(result?.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
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
      httpRequest
        .delete(`users/delete/${userIdRef.current}`)
        .then((result) => {
          setIsLoaded(true);
          const newUserList = [...users];
          const index = users.findIndex(
            (user) => user.userId === userIdRef.current
          );
          newUserList.splice(index, 1);
          setUsers(newUserList);
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
      <SearchBar page={"user"} />
      {msgStatus.isSuccess && (
        <Message
          isSuccess={msgStatus.isSuccess}
          msg={msgStatus.msg}
          onCloseMsg={() => setMsgStatus("", false)}
        />
      )}
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
      {popup.isLoading && (
        <PopupConfirm message={popup.message} onPopup={confirmDelete} />
      )}
      <Pagination />
    </View>
  );
}

export default UserView;
