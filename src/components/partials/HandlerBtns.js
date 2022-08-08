import React from "react";
import { Link } from "react-router-dom";
import styles from "~/styles/components/form.module.scss";

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
    <div className={`${styles["handler-btn"]} form-group`}>
      <Link to={"../view"} className={`${styles["btn"]} btn btn-danger`}>
        Cancel
      </Link>
      <button className={`${styles["btn"]} btn btn-${color}`}>{action}</button>
    </div>
  );
}

export default HandlerBtns;
