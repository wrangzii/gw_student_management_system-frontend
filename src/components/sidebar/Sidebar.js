import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import components from "./components";
import { hideSidebar } from "./sidebarHandler";
import { useAuth } from "~/store/auth";
import styles from "./sidebar.module.scss";
import Cookies from "js-cookie";

function Sidebar() {
  const { auth, setAuth } = useAuth();
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth((prev) => ({
      ...prev,
      accessToken: null,
    }));
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("jSessionId");
    navigate("/");
  };

  return (
    <div className={`${styles["overlay"]} overlay overflow-auto`}>
      <div className={`${styles["sidebar"]} sidebar`}>
        <div className={styles["sidebar-header"]}>
          <div className="mb-0 p-3 text-center bg-warning fw-bold">
            Signed in as{" "}
            <button type="button" className="btn badge bg-success">
              {auth?.user?.username}
            </button>
            <div className={styles["user-tooltip"]}>
              <Link
                to={`/user/view/detail/${auth?.user?.userId}`}
                className="info btn btn-info text-light"
                onClick={hideSidebar}
              >
                <i className="fa-solid fa-user"></i>
                Profile
              </Link>
              <button className="signout btn btn-danger" onClick={handleLogout}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                Sign out
              </button>
              {/* <a
                className="signout btn btn-danger"
                href="http://localhost:8000/logout"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                Sign out
              </a> */}
            </div>
          </div>
        </div>
        <div className={styles["sidebar-body"]}>
          <ul>
            {components.map((component, index) => (
              <li
                key={index}
                className="w-100 px-2"
                onMouseEnter={() => setIsShow(true)}
                onMouseLeave={() => setIsShow(false)}
              >
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
                {isShow && (
                  <div className="d-flex flex-column gap-2 ps-3">
                    {component?.children?.map((child, index) => (
                      <Link
                        to={child.path}
                        key={index}
                        className={styles["child-item"]}
                      >
                        <span>
                          <i className={child.icon}></i>
                        </span>
                        <p>{child.title}</p>
                      </Link>
                    ))}
                  </div>
                )}
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
