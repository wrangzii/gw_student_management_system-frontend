import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { Loading } from "~/components";
import httpRequest from "~/utils/httpRequest";
import { usePagination } from "~/store/pagination";

function Pagination({ onClickPage }) {
  const [pageNumber, setPageNumber] = useState(0);
  const { pagination, setPagination } = usePagination();
  const [amountOfItem, setAmountOfItem] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const nextRef = useRef();
  const prevRef = useRef();

  // Handle pagination action
  useEffect(() => {
    setIsLoaded(false);
    httpRequest.get("student/pageNumber").then((result) => {
      setAmountOfItem(result?.data);
      setIsLoaded(true);
    });
    // Handle pointer-event
    const currentPageNumber = window.location.href.split("=")[1];
    pageNumber <= 0 || currentPageNumber <= 0
      ? prevRef.current.classList.add("pe-none")
      : prevRef.current.classList.remove("pe-none");

    // Send context page number
    setPagination({ pageNumber });
  }, [pageNumber]);

  // Count page length
  const countPageLength = () => {
    const pageLength = amountOfItem / 15;
    return Math.floor(pageLength);
  };

  const renderPage = () => {
    let totalPage = countPageLength();
    let buttonsArr = [];
    for (let i = 1; i <= totalPage; i++) {
      buttonsArr.push(i);
    }
    return buttonsArr;
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
        {isLoaded ? (
          renderPage().map((item) => (
            <Link
              to={`?page=${item}`}
              className="page-link text-center"
              key={item}
              onClick={() => onClickPage(item)}
            >
              {item}
            </Link>
          ))
        ) : (
          <Loading />
        )}
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
