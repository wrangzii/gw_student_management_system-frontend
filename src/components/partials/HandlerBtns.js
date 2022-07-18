import React from "react";
import {Link} from "react-router-dom";

function HandlerBtns({ action, color }) {
  switch (action) {
    case "Create":
      color = "success";
      break;
    case "Update":
      color = "warning";
      break;
    default:
      color = "success";
  }
  return (
    <div className="handler-btn form-group">
      <Link to={"../view"} className="btn btn-danger">
        Cancel
      </Link>
      <button className={`btn btn-${color}`}>{action}</button>
    </div>
  );
}

export default HandlerBtns;
