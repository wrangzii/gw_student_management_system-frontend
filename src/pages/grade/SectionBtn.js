import React, { useCallback, useState } from "react";
import Table from "./Table";
import styles from "./grade.module.scss";

function SectionBtn({ title, color }) {
  const [isShow, setIsShow] = useState(false);
  const handleCollapse = useCallback(() => {
    setIsShow((prevState) => !prevState);
  }, []);

  return (
    <div className={title}>
      <button
        className={`btn btn-${color} ${styles["collapse-btn"]}`}
        onClick={handleCollapse}
      >
        <i
          className={`fa-solid fa-chevron-${isShow ? "down" : "up"} p-0 me-2`}
        ></i>
        {title}
      </button>
      {isShow && (
        <>
          <h5>{title}</h5>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>FPT_ID</th>
                <th>Fullname</th>
                <th>Subject</th>
                <th>Grade</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
}

export default SectionBtn;
