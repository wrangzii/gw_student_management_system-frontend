import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import axios from "axios";

import { headers } from "~/utils/headersToken";
import { Loading } from "~/components/partials";
import ViewDetail from "~/components/partials/crud/ViewDetail";

function MajorViewDetail() {
  const { id } = useParams();
  const [viewDetail, setViewDetail] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/major/${id}`,
      headers,
    }).then((result) => setViewDetail(result.data.data));
  }, []);

  return (
    <ViewDetail>
      <div className="overflow-auto">
        {viewDetail.length !== 0 ? (
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
                {new Date(viewDetail.modifyDate).toLocaleDateString()}
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
      </div>
    </ViewDetail>
  );
}

export default MajorViewDetail;
