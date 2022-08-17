import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import axios from "axios";

import { headers } from "~/utils/headersToken";
import { Loading } from "~/components";
import ViewDetail from "~/components/crud/ViewDetail";

function RoleViewDetail() {
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
    <ViewDetail>
      <div className="overflow-auto">
        {viewDetail.length !== 0 ? (
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
                <Link to={`/role/update/${id}`}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </ViewDetail>
  );
}

export default RoleViewDetail;