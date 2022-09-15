import React from "react";
import { Link } from "react-router-dom";

import styles from "~/styles/components/form.module.scss";

function HandlerBtns({ action, color }) {
  switch (action) {
    case "create":
      color = "success";
      break;
    case "update":
      color = "warning";
      break;
    default:
      color = "success";
  }
  return (
    <div className={`${styles["handler-btn"]} form-group`}>
      <Link
        to={"../view"}
        className={`${styles["btn"]} btn btn-danger text-capitalize`}
      >
        Cancel
      </Link>
      <button className={`${styles["btn"]} btn btn-${color} text-capitalize`}>
        {action}
      </button>
    </div>
  );
}

export default HandlerBtns;
