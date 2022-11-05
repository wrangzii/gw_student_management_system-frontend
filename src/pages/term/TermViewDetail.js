import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Loading } from "~/components";
import ViewDetail from "~/components/crud/ViewDetail";
import httpRequest from "~/utils/httpRequest";

function TermViewDetail() {
  const { id } = useParams();
  const [viewDetail, setViewDetail] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Get current term's info
  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`term/filter?pageNumber=0&search=termCode:*${id}`)
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
          {viewDetail.map((term, index) => (
            <div className="table" key={index}>
              <div className="tr">
                <div className="th">Term</div>
                <div className="td">{term.termName}</div>
              </div>
              <div className="tr">
                <div className="th">Term Code</div>
                <div className="td">{term.termCode}</div>
              </div>
              <div className="tr">
                <div className="th">Description</div>
                <div className="td">{term.description}</div>
              </div>
              <div className="tr">
                <div className="th">Created Date</div>
                <div className="td">
                  {new Date(term.createDate).toLocaleDateString()}
                </div>
              </div>
              <div className="tr">
                <div className="th">Created By</div>
                <div className="td">{term.createBy}</div>
              </div>
              <div className="tr">
                <div className="th">Modified Date</div>
                <div className="td">
                  {term.modifyDate !== null &&
                    new Date(term.modifyDate).toLocaleDateString()}
                </div>
              </div>
              <div className="tr">
                <div className="th">Modified By</div>
                <div className="td">{term.modifyBy}</div>
              </div>
              <div className="tr">
                <div className="th">Update</div>
                <div className="td">
                  <Link to={`/term/update/${id}`}>
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

export default TermViewDetail;
