import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Loading } from "~/components";
import ViewDetail from "~/components/crud/ViewDetail";
import httpRequest from "~/utils/httpRequest";

function RoleViewDetail() {
  const { id } = useParams();
  const [viewDetail, setViewDetail] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Get role's detail info
  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`role/${id}`)
      .then((result) => {
        setViewDetail(result?.data?.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  }, []);

  return (
    <ViewDetail>
      <div className="overflow-auto">
        {isLoaded ? (
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
