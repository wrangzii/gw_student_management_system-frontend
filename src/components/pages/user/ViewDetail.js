import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { headers } from "~/components/headersToken";
import { Loading } from "~/components/partials";

function ViewDetail() {
  const { id } = useParams();
  const [viewDetail, setViewDetail] = useState([]);
  const [departmentName, setDepartmentName] = useState({});
  const [roles, setRoles] = useState([]);

  // Get current user's info
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/users/${id}`,
      headers,
    }).then((result) => {
      setViewDetail(result.data.data);
      setDepartmentName(result.data.data.departmentId.departmentName);
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
    });
  }, [id]);

  return (
    <div className="user-detail">
      <div className="overflow-auto">
        {viewDetail.length !== 0 ? (
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
      </div>
    </div>
  );
}

export default ViewDetail;
