import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { headers } from "../../headersToken";

function ViewDetail() {
  const { id } = useParams();
  const [viewDetail, setViewDetail] = useState([]);

  // Get role's detail info
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/role/${id}`,
      headers,
    }).then((result) => {
      if (result) {
        setViewDetail(result.data.data);
      }
    });
  }, []);

  return (
    <div className="role-detail">
      <div className="overflow-auto">
        <div className="table">
          <div className="tr">
            <div className="th">ID</div>
            <div className="td">{viewDetail.roleId}</div>
          </div>
          <div className="tr">
            <div className="th">Role</div>
            <div className="td">{viewDetail.roleName}</div>
          </div>
          <div className="tr">
            <div className="th">Description</div>
            <div className="td">{viewDetail.description}</div>
          </div>
          <div className="tr">
            <div className="th">Created By</div>
            <div className="td">{viewDetail.createBy}</div>
          </div>
          <div className="tr">
            <div className="th">Update</div>
            <div className="td">
              <Link to={`/role/update/${id}`}>
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
