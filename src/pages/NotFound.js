import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <div className="container text-center">
          <h1 className="display-1 fw-bold text-danger">404</h1>
          <h4 className="text-uppercase">oops, sorry we can't find that page!</h4>
          <hr />
          <Link to={"/"} className="btn btn-success">
            Back to home
          </Link>
      </div>
    </div>
  );
}

export default NotFound;
