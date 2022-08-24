import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Loading } from "~/components";
import ViewDetail from "~/components/crud/ViewDetail";
import httpRequest from "~/utils/httpRequest";

function MajorViewDetail() {
  const { id } = useParams();
  const [viewDetail, setViewDetail] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Get role's detail info
  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`major/${id}`)
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
      {isLoaded ? (
        <div className="table">
          <div className="tr">
            <div className="th">ID</div>
            <div className="td">{viewDetail.majorId}</div>
          </div>
          <div className="tr">
            <div className="th">E_Major Name</div>
            <div className="td">{viewDetail.ename}</div>
          </div>
          <div className="tr">
            <div className="th">V_Major Name</div>
            <div className="td">{viewDetail.vname}</div>
          </div>
          <div className="tr">
            <div className="th">Major Code</div>
            <div className="td">{viewDetail.majorCode}</div>
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
              {viewDetail.modifyBy !== null &&
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
              <Link to={`/major/update/${id}`}>
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

export default MajorViewDetail;
