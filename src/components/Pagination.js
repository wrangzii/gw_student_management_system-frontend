import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import httpRequest from "~/utils/httpRequest";
import { usePagination } from "~/store/pagination";

function Pagination({ pageName }) {
  const [pageNumber, setPageNumber] = useState(0);
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

    pageNumber >= countPageLength()
      ? nextRef.current.classList.add("pe-none")
      : nextRef.current.classList.remove("pe-none");
    // Send context page number
    setPagination({ pageNumber });
  }, [pageNumber]);

  // Count page length
  const countPageLength = () => {
    const pageLength = amountOfItem / 15;
    return Math.floor(pageLength);
  };

  return (
    <ul className="pagination my-3">
      <li
        className="page-item prev"
        onClick={() => setPageNumber(pagination.pageNumber - 1)}
        ref={prevRef}
      >
        <Link
          className="page-link"
          to={`?page=${pageNumber - 1}`}
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
          <span className="sr-only">Previous</span>
        </Link>
      </li>
      <li className="page-item">
        <button className="page-link text-center">{`${
          pagination.pageNumber + 1
        }/${countPageLength() + 1}`}</button>
      </li>
      <li
        className="page-item next"
        onClick={() => setPageNumber(pagination.pageNumber + 1)}
        ref={nextRef}
      >
        <Link
          className="page-link"
          to={`?page=${pageNumber + 1}`}
          aria-label="Previous"
        >
          <span aria-hidden="true">&raquo;</span>
          <span className="sr-only">Next</span>
        </Link>
      </li>
    </ul>
  );
}

export default Pagination;
