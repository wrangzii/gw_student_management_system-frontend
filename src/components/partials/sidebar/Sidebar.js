import React from "react";
import { Link } from "react-router-dom";
import components from "./components";
import handleSignout from "./signout";
import { hideSidebar } from "./sidebarHandler";
import Cookies from "js-cookie";

function Sidebar() {
  const user = JSON.parse(Cookies.get("user"));
  return (
    <div className="overlay overflow-auto">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="mb-0 p-3 text-center bg-warning fw-bold">
            Signed in as{" "}
            <button type="button" className="btn badge bg-success">
              {user.username}
            </button>
            <div className="user-tooltip">
              <Link
                to={`/user/view/detail/${user.userId}`}
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
        <div className="sidebar-body">
          <ul>
            {components.map((component, index) => (
              <li key={index} className="w-100 px-2">
                <Link
                  to={component.path}
                  className="py-3 py-md-4"
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
        <div className="sidebar-footer">
          <button onClick={hideSidebar} className="btn btn-danger closeBtn">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
