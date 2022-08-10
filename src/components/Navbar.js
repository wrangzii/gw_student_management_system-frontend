import React from "react";
import { Link } from "react-router-dom";
import { showSidebar } from "./sidebar/sidebarHandler";
import Sidebar from "./sidebar/Sidebar";
import logo from "~/assets/images/logo.png";
import { useAuth } from "~/store/auth";

function Navbar() {
  const { auth } = useAuth();

  return (
    <>
      <nav className="navbar">
        <Link className="navbar-brand" to={"/"}>
          <img src={logo} width="250" alt="logo" id="logo" />
        </Link>
        {auth?.accessToken ? (
          <button
            type="button"
            className="border-0 me-3 toggleBtn"
            onClick={showSidebar}
          >
            <i
              className="fa-solid fa-bars"
              style={{ backgroundColor: "transparent", color: "#000" }}
            ></i>
          </button>
        ) : (
          <Link to={"/login"} className="btn btn-primary me-3">
            Sign in
          </Link>
        )}
      </nav>
      {auth?.accessToken && <Sidebar />}
    </>
  );
}

export default Navbar;
