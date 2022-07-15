import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { headers } from "../../headersToken";

function ViewDetail() {
  const { id } = useParams();
  const [viewDetail, setViewDetail] = useState([]);
  const [departmentId, setDepartmentId] = useState({});
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/users/${id}`,
      headers,
    }).then((result) => {
      setViewDetail(result.data.data);
      setDepartmentId(result.data.data.departmentId);
      setRoles(
        result.data.data.roles.map((role) => (
          <button className="btn badge bg-danger">{role.roleName}</button>
        ))
      );
    });
  }, []);

  return (
    <div className="user-detail">
      <div className="overflow-auto">
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
            <div className="th">Phone Number</div>
            <div className="td">{viewDetail.phoneNumber}</div>
          </div>
          <div className="tr">
            <div className="th">Address</div>
            <div className="td">{viewDetail.address}</div>
          </div>
          <div className="tr">
            <div className="th">Department</div>
            <div className="td">{departmentId.departmentName}</div>
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
      </div>
    </div>
  );
}

export default ViewDetail;
