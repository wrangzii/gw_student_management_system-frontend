import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ViewDetail from "~/components/crud/ViewDetail";
import { Loading } from "~/components";
import httpRequest from "~/utils/httpRequest";

function UserViewDetail() {
  const { id } = useParams();
  const [viewDetail, setViewDetail] = useState([]);
  const [departmentName, setDepartmentName] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [roles, setRoles] = useState([]);

  // Get current user's info
  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`users/${id}`)
      .then((result) => {
        const data = result?.data?.data;
        setViewDetail(data);
        setDepartmentName(data?.departmentId?.departmentName);
        setRoles(
          result.data.data.roles.map((role) => (
            <button
              type="button"
              key={role.roleId}
              className="btn badge bg-danger"
            >
              {role.roleName}
            </button>
          ))
        );
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
          <div className="tr">
            <div className="th">Fullname</div>
            <div className="td">{viewDetail.fullName}</div>
          </div>
          <div className="tr">
            <div className="th">Username</div>
            <div className="td">{viewDetail.username}</div>
          </div>
          <div className="tr">
            <div className="th">Email</div>
            <div className="td">{viewDetail.email}</div>
          </div>
          <div className="tr">
            <div className="th">Birthday</div>
            <div className="td">
              {new Date(viewDetail.dob).toLocaleDateString()}
            </div>
          </div>
          <div className="tr">
            <div className="th">Phone Number</div>
            <div className="td">{viewDetail.phoneNumber}</div>
          </div>
          <div className="tr">
            <div className="th">Address</div>
            <div className="td">{viewDetail.address}</div>
          </div>
          <div className="tr">
            <div className="th">Department</div>
            <div className="td">{departmentName}</div>
          </div>
          <div className="tr">
            <div className="th">Role</div>
            <div className="td">{roles}</div>
          </div>
          <div className="tr">
            <div className="th">Created Date</div>
            <div className="td">
              {new Date(viewDetail.createDate).toLocaleDateString()}
            </div>
          </div>
          <div className="tr">
            <div className="th">Created By</div>
            <div className="td">{viewDetail.createBy}</div>
          </div>
          <div className="tr">
            <div className="th">Modified Date</div>
            <div className="td">
              {viewDetail.modifyDate !== null &&
                new Date(viewDetail.modifyDate).toLocaleDateString()}
            </div>
          </div>
          <div className="tr">
            <div className="th">Modified By</div>
            <div className="td">{viewDetail.modifyBy}</div>
          </div>
          <div className="tr">
            <div className="th">Update</div>
            <div className="td">
              <Link to={`/user/update/${viewDetail.userId}`}>
                <i className="fa-solid fa-pen-to-square"></i>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </ViewDetail>
  );
}

export default UserViewDetail;
