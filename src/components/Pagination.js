import { usePagination } from "~/store/pagination";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Pagination() {
  const [pageNumber, setPageNumber] = useState(0);
  const { pagination, setPagination } = usePagination();
  const nextRef = useRef();
  const prevRef = useRef();

  // Handle pagination action
  useEffect(() => {
    // Handle pointer-event
    pageNumber <= 0
      ? prevRef.current.classList.add("pe-none")
      : prevRef.current.classList.remove("pe-none");

    // Send context page number
    setPagination({ pageNumber });
  }, [pageNumber]);

  return (
    <ul className="pagination">
      <li
        className="page-item prev"
        onClick={() => setPageNumber(pagination.pageNumber - 1)}
        ref={prevRef}
      >
        <Link
          className="page-link"
          to={`?pageNumber=${pageNumber - 1}`}
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
          <span className="sr-only">Previous</span>
        </Link>
      </li>
      <li
        className="page-item next"
        onClick={() => setPageNumber(pagination.pageNumber + 1)}
        ref={nextRef}
      >
        <Link
          className="page-link"
          to={`?pageNumber=${pageNumber + 1}`}
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
