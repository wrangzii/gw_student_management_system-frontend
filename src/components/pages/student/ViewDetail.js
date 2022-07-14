import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { headers } from "../../headersToken";

function ViewDetail() {
  const { id } = useParams();
  const [viewDetail, setViewDetail] = useState([]);

  // Get student's detail info
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/student/${id}`,
      headers,
    }).then((result) => {
      if (result) {
        setViewDetail(result.data.data);
      }
    });
  }, []);

  return (
    <div className="student-detail">
      <div className="overflow-auto">
        <div className="table">
          <div className="tr">
            <div className="th">Fullname</div>
            <div className="td">{viewDetail.fullName}</div>
          </div>
          <div className="tr">
            <div className="th">Email</div>
            <div className="td">{viewDetail.email}</div>
          </div>
          <div className="tr">
            <div className="th">Gender</div>
            <div className="td">{viewDetail.gender}</div>
          </div>
          <div className="tr">
            <div className="th">Birthday</div>
            <div className="td">
              {new Date(viewDetail.dob).toLocaleDateString()}
            </div>
          </div>
          <div className="tr">
            <div className="th">Student ID</div>
            <div className="td">{viewDetail.studentId}</div>
          </div>
          <div className="tr">
            <div className="th">FPT ID</div>
            <div className="td">{viewDetail.fptId}</div>
          </div>
          <div className="tr">
            <div className="th">Person ID</div>
            <div className="td">{viewDetail.personId}</div>
          </div>
          <div className="tr">
            <div className="th">UOG ID</div>
            <div className="td">{viewDetail.uogId}</div>
          </div>
          <div className="tr">
            <div className="th">Created By</div>
            <div className="td">{viewDetail.createBy}</div>
          </div>
          <div className="tr">
            <div className="th">Created Date</div>
            <div className="td">
              {new Date(viewDetail.createDate).toLocaleDateString()}
            </div>
          </div>
          <div className="tr">
            <div className="th">Modified By</div>
            <div className="td">{viewDetail.modifyBy}</div>
          </div>
          <div className="tr">
            <div className="th">Modified Date</div>
            <div className="td">
              {new Date(viewDetail.modifyDate).toLocaleDateString()}
            </div>
          </div>
          <div className="tr">
            <div className="th">Update</div>
            <div className="td">
              <Link to={`/student/update/${id}`}>
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
