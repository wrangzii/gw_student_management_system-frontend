import { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";

import httpRequest from "~/utils/httpRequest";
import { usePagination } from "~/store/pagination";

function Pagination({ pageName }) {
  const [pageNumber, setPageNumber] = useState(1);
  const { setPagination } = usePagination();
  const [amountOfItem, setAmountOfItem] = useState(0);

  // Handle pagination action
  useEffect(() => {
    httpRequest
      .get(`${pageName}/pageNumber`)
      .then((result) => {
        setAmountOfItem(result?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Count page length
  const countPageLength = () => {
    const pageLength = amountOfItem / 15;
    return Math.floor(pageLength);
  };

  // Input pagination
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef) {
      inputRef.current.onkeypress = (e) => {
        if (e.key === "Enter") {
          if (
            inputRef.current.value <= 0 ||
            inputRef.current.value > countPageLength()
          )
            return;
          setPagination({ pageNumber });
        }
      };
    }
  }, [pageNumber]);

  return (
    <ul className="pagination my-3 justify-content-end">
      <li className="page-item">
        <button className="page-link text-center d-flex" id="paginationInput">
          <span className="me-3 d-block">Page</span>
          <input
            type="number"
            min={1}
            max={countPageLength() + 1}
            defaultValue={pageNumber}
            onChange={(e) => setPageNumber(Number(e.target.value))}
            ref={inputRef}
          />
          / {countPageLength()}
        </button>
      </li>
    </ul>
  );
}

export default Pagination;
