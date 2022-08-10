import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Pagination({ apiName }) {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);

  const url = window.location.pathname;
  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
    navigate(`${url}?page=${pageNumber}`);
  };

  return (
    <ul className="pagination">
      <li className="page-item">
        <button type="button" className="page-link" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span className="sr-only">Previous</span>
        </button>
      </li>
      <li className="page-item">
        <button type="button" className="page-link">
          1
        </button>
      </li>
      <li className="page-item">
        <button
          type="button"
          className="page-link"
          aria-label="Next"
          onClick={handleNextPage}
        >
          <span aria-hidden="true">&raquo;</span>
          <span className="sr-only">Next</span>
        </button>
      </li>
    </ul>
  );
}

export default Pagination;
