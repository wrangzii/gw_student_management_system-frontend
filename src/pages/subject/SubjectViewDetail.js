import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Loading } from "~/components";
import ViewDetail from "~/components/crud/ViewDetail";
import httpRequest from "~/utils/httpRequest";

function SubjectViewDetail() {
  const { id } = useParams();
  const [viewDetail, setViewDetail] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`subject/filter?pageNumber=0&search=subjectCode:*${id}`)
      .then((result) => {
        const data = result?.data?.data;
        setViewDetail(data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  }, [id]);

  return (
    <ViewDetail>
      {isLoaded ? (
        <>
          {viewDetail?.map((subject, index) => (
            <div className="table" key={index}>
              <div className="tr">
                <div className="th">Subject</div>
                <div className="td">{subject.subjectName}</div>
              </div>
              <div className="tr">
                <div className="th">Subject Code</div>
                <div className="td">{subject.subjectCode}</div>
              </div>
              <div className="tr">
                <div className="th">Description</div>
                <div className="td">{subject.description}</div>
              </div>
              <div className="tr">
                <div className="th">Replace With</div>
                <div className="td">{subject.replaceWith}</div>
              </div>
              <div className="tr">
                <div className="th">Created Date</div>
                <div className="td">
                  {new Date(subject.createDate).toLocaleDateString()}
                </div>
              </div>
              <div className="tr">
                <div className="th">Created By</div>
                <div className="td">{subject.createBy}</div>
              </div>
              <div className="tr">
                <div className="th">Modified Date</div>
                <div className="td">
                  {subject.modifyDate !== null &&
                    new Date(subject.modifyDate).toLocaleDateString()}
                </div>
              </div>
              <div className="tr">
                <div className="th">Modified By</div>
                <div className="td">{subject.modifyBy}</div>
              </div>
              <div className="tr">
                <div className="th">Update</div>
                <div className="td">
                  <Link to={`/subject/update/${id}`}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <Loading />
      )}
    </ViewDetail>
  );
}

export default SubjectViewDetail;
