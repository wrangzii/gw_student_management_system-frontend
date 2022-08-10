import React from "react";
import { Link } from "react-router-dom";
import components from "./components";
import { hideSidebar } from "./sidebarHandler";
import { useAuth } from "~/store/auth";
import styles from "./sidebar.module.scss";

function Sidebar() {
  const { auth } = useAuth();

  return (
    <div className={`${styles["overlay"]} overlay overflow-auto`}>
      <div className={`${styles["sidebar"]} sidebar`}>
        <div className={styles["sidebar-header"]}>
          <div className="mb-0 p-3 text-center bg-warning fw-bold">
            Signed in as{" "}
            <button type="button" className="btn badge bg-success">
              {auth.username}
            </button>
            <div className={styles["user-tooltip"]}>
              <Link
                to={`/user/view/detail/${auth.userId}`}
                className="info btn btn-info text-light"
                onClick={hideSidebar}
              >
                <i className="fa-solid fa-user"></i>
                Profile
              </Link>
              <a
                className="signout btn btn-danger"
                href="http://localhost:8080/logout"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                Sign out
              </a>
            </div>
          </div>
        </div>
        <div className={styles["sidebar-body"]}>
          <ul>
            {components.map((component, index) => (
              <li key={index} className="w-100 px-2">
                <Link
                  to={component.path}
                  className="py-3"
                  onClick={hideSidebar}
                >
                  <span>
                    <i className={component.icon}></i>
                  </span>
                  <p className="fw-bold">{component.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles["sidebar-footer"]}>
          <button
            onClick={hideSidebar}
            className={`${styles["closeBtn"]} btn btn-danger`}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
