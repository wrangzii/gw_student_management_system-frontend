import { useState, useEffect, useRef } from "react";

import { usePagination } from "~/store/pagination";

function Pagination({ pageCount }) {
  const [pageNumber, setPageNumber] = useState(1);
  const { setPagination } = usePagination();

  // Input pagination
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef) {
      inputRef.current.onkeypress = (e) => {
        if (e.key === "Enter") {
          if (inputRef.current.value <= 0 || inputRef.current.value > pageCount)
            return;
          setPagination({ pageNumber });
        }
      };
    }
  }, [pageNumber]);

  return (
    <ul className="pagination my-3">
      <li className="page-item">
        <button className="page-link text-center d-flex" id="paginationInput">
          <span className="me-3 d-block">Page</span>
          <input
            type="number"
            min={1}
            max={pageCount}
            defaultValue={pageNumber}
            onChange={(e) => setPageNumber(Number(e.target.value))}
            ref={inputRef}
          />
          / {pageCount}
        </button>
      </li>
    </ul>
  );
}

export default Pagination;
