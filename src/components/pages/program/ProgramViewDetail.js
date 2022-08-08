import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import axios from "axios";

import { headers } from "~/utils/headersToken";
import { Loading } from "~/components/partials";
import ViewDetail from "~/components/partials/crud/ViewDetail";

function ProgramViewDetail() {
  const { id } = useParams();
  const [viewDetail, setViewDetail] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/program/${id}`,
      headers,
    }).then((result) => setViewDetail(result.data.data));
  }, []);

  return (
    <ViewDetail>
      <div className="overflow-auto">
        {viewDetail.length !== 0 ? (
          <div className="table">
            <div className="tr">
              <div className="th">Program ID</div>
              <div className="td">{viewDetail.programId}</div>
            </div>
            <div className="tr">
              <div className="th">Program</div>
              <div className="td">{viewDetail.programName}</div>
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
                <Link to={`/program/update/${id}`}>
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

export default ProgramViewDetail;
