import React from "react";
import { Link } from "react-router-dom";
import { cookies } from "../../headersToken";
import components from "./components";
import handleSignout from "./signout";

function Sidebar() {
  return (
    <div className="overlay">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="mb-0 p-3 text-center bg-warning fw-bold">
            Signed in as{" "}
            <button type="button" className="btn badge bg-success">
              {cookies.get("username")}
            </button>
            <div className="user-tooltip">
              <Link
                to={`/user/view/detail/${cookies.get("userId")}`}
                className="info btn btn-info text-light"
              >
                <i className="fa-solid fa-user"></i>
                Profile
              </Link>
              <Link
                to={'/'}
                className="signout btn btn-danger"
                onClick={handleSignout}
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                Sign out
              </Link>
            </div>
          </div>
        </div>
        <div className="sidebar-body">
          {components.map((component, index) => (
            <ul key={index}>
              <li className="w-100 px-2">
                <Link to={component.path} className="py-4">
                  <span>
                    <i className={component.icon}></i>
                  </span>
                  <p className="fw-bold">{component.title}</p>
                </Link>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
