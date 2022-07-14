import React from "react";
import {Link} from "react-router-dom";

function ActionBtns({ action, color }) {
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
    <div className="action-btn form-group">
      <Link to={"../view"} className="btn btn-danger">
        Cancel
      </Link>
      <button className={`btn btn-${color}`}>{action}</button>
    </div>
  );
}

export default ActionBtns;
