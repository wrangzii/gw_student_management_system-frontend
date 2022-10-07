import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ViewDetail from "~/components/crud/ViewDetail";
import { Loading } from "~/components";
import httpRequest from "~/utils/httpRequest";

function StudentViewDetail() {
  const { id } = useParams();
  const [viewDetail, setViewDetail] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Get student's detail info
  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`student/filter?pageNumber=0&search=fptId:${id}`)
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
        <Fragment>
          {viewDetail?.map((detail, index) => (
            <div className="table" key={index}>
              <div className="tr">
                <div className="th">Fullname</div>
                <div className="td">{detail.fullName}</div>
              </div>
              <div className="tr">
                <div className="th">Grade</div>
                <div className="td">
                  <Link className="btn btn-danger p-2" to={"./view-grade"}>
                    <i className="fa-solid fa-eye p-0 me-2"></i>
                    View grade
                  </Link>
                </div>
              </div>
              <div className="tr">
                <div className="th">Email</div>
                <div className="td">{detail.email}</div>
              </div>
              <div className="tr">
                <div className="th">Gender</div>
                <div className="td">{detail.gender}</div>
              </div>
              <div className="tr">
                <div className="th">Birthday</div>
                <div className="td">
                  {new Date(detail.dob).toLocaleDateString()}
                </div>
              </div>
              <div className="tr">
                <div className="th">FPT ID</div>
                <div className="td">{detail.fptId}</div>
              </div>
              <div className="tr">
                <div className="th">Person ID</div>
                <div className="td">{detail.personId}</div>
              </div>
              <div className="tr">
                <div className="th">UOG ID</div>
                <div className="td">{detail.uogId}</div>
              </div>
              <div className="tr">
                <div className="th">Status</div>
                <div className="td">{detail.status}</div>
              </div>
              <div className="tr">
                <div className="th">Created By</div>
                <div className="td">{detail.createBy}</div>
              </div>
              <div className="tr">
                <div className="th">Created Date</div>
                <div className="td">
                  {new Date(detail.createDate).toLocaleDateString()}
                </div>
              </div>
              <div className="tr">
                <div className="th">Modified By</div>
                <div className="td">{detail.modifyBy}</div>
              </div>
              <div className="tr">
                <div className="th">Modified Date</div>
                <div className="td">
                  {detail.modifyDate !== null &&
                    new Date(detail.modifyDate).toLocaleDateString()}
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
          ))}
        </Fragment>
      ) : (
        <Loading />
      )}
    </ViewDetail>
  );
}

export default StudentViewDetail;
