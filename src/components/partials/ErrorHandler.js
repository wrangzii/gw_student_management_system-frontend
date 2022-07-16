import React from "react";

function ErrorHandler({ name, msg }) {
  return (
    <div className="error">
      <small className="d-block mb-3 text-danger">
        {name} {msg}!
      </small>
    </div>
  );
}

export default ErrorHandler;
