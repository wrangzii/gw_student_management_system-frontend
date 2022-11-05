import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ViewDetail from "~/components/crud/ViewDetail";
import { Loading } from "~/components";
import httpRequest from "~/utils/httpRequest";

function UserViewDetail() {
  const { id } = useParams();
  const [viewDetail, setViewDetail] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Get current user's info
  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`users/filter?pageNumber=0&search=userId:${id}`)
      .then((result) => {
        const data = result?.data?.data;
        setViewDetail(data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  }, [id]);

  return (
    <ViewDetail>
      {isLoaded ? (
        <div className="table">
          {viewDetail.map((user, index) => (
            <Fragment key={index}>
              <div className="tr">
                <div className="th">Fullname</div>
                <div className="td">{user.fullName}</div>
              </div>
              <div className="tr">
                <div className="th">Username</div>
                <div className="td">{user.username}</div>
              </div>
              <div className="tr">
                <div className="th">Email</div>
                <div className="td">{user.email}</div>
              </div>
              <div className="tr">
                <div className="th">Birthday</div>
                <div className="td">
                  {new Date(user.dob).toLocaleDateString()}
                </div>
              </div>
              <div className="tr">
                <div className="th">Phone Number</div>
                <div className="td">{user.phoneNumber}</div>
              </div>
              <div className="tr">
                <div className="th">Address</div>
                <div className="td">{user.address}</div>
              </div>
              <div className="tr">
                <div className="th">Department</div>
                <div className="td">{user.departmentId.departmentName}</div>
              </div>
              <div className="tr">
                <div className="th">Role</div>
                <div className="td">{user.roles.map(role => role.roleName)}</div>
              </div>
              <div className="tr">
                <div className="th">Created Date</div>
                <div className="td">
                  {new Date(user.createDate).toLocaleDateString()}
                </div>
              </div>
              <div className="tr">
                <div className="th">Created By</div>
                <div className="td">{user.createBy}</div>
              </div>
              <div className="tr">
                <div className="th">Modified Date</div>
                <div className="td">
                  {user.modifyDate !== null &&
                    new Date(user.modifyDate).toLocaleDateString()}
                </div>
              </div>
              <div className="tr">
                <div className="th">Modified By</div>
                <div className="td">{user.modifyBy}</div>
              </div>
              <div className="tr">
                <div className="th">Update</div>
                <div className="td">
                  <Link to={`/user/update/${user.userId}`}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </ViewDetail>
  );
}

export default UserViewDetail;
