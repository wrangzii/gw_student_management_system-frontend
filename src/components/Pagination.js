import { useState, useEffect, useRef, useCallback } from "react";
// import { Link } from "react-router-dom";

import httpRequest from "~/utils/httpRequest";
import { usePagination } from "~/store/pagination";

function Pagination({ pageName }) {
  const [pageNumber, setPageNumber] = useState(0);
  const [pageValue, setPageValue] = useState(1);
  const { pagination, setPagination } = usePagination(0);
  const [amountOfItem, setAmountOfItem] = useState(0);
  const nextRef = useRef();
  const prevRef = useRef();

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
    // Handle pointer-event
    pageNumber <= 0
      ? prevRef.current.classList.add("pe-none")
      : prevRef.current.classList.remove("pe-none");

    // pageNumber >= countPageLength()
    //   ? nextRef.current.classList.add("pe-none")
    //   : nextRef.current.classList.remove("pe-none");
    // Send context page number
    setPagination({ pageNumber });
  }, [pageNumber]);

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
          setPageNumber(pageValue);
        }
      };
    }
  }, [pageValue]);

  return (
    <ul className="pagination my-3">
      <li
        className="page-item prev"
        onClick={() => setPageNumber(pagination.pageNumber - 1)}
        ref={prevRef}
      >
        <button
          className="page-link"
          // to={`?page=${pageNumber - 1}`}
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
          <span className="sr-only">Previous</span>
        </button>
      </li>
      <li className="page-item">
        {/* <button className="page-link text-center">{`${
          pagination.pageNumber + 1
        }/${countPageLength() + 1}`}</button> */}
        <button className="page-link text-center" id="paginationInput">
          <input
            type="number"
            defaultValue={pageValue}
            onChange={(e) => setPageValue(e.target.value)}
            ref={inputRef}
          />
          / {countPageLength() + 1}
        </button>
      </li>
      <li
        className="page-item next"
        onClick={() => setPageNumber(pagination.pageNumber + 1)}
        ref={nextRef}
      >
        <button
          className="page-link"
          // to={`?page=${pageNumber + 1}`}
          aria-label="Previous"
        >
          <span aria-hidden="true">&raquo;</span>
          <span className="sr-only">Next</span>
        </button>
      </li>
    </ul>
  );
}

export default Pagination;
