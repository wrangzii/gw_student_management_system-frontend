import React from "react";
import { Link } from "react-router-dom";
import { Cookies } from "~/components//headersToken";
import { showSidebar } from "./sidebar/sidebarHandler";
import Sidebar from "./sidebar/Sidebar";
import logo from "~/assets/images/logo.png";

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <Link className="navbar-brand" to={"/"}>
          <img src={logo} width="250" alt="logo" id="logo" />
        </Link>
        {Cookies.get("token") && (
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
        )}
      </nav>
      {Cookies.get("token") && <Sidebar />}
    </>
  );
}

export default Navbar;
