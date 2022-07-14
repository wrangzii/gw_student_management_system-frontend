import React from "react";
import { Link } from "react-router-dom";
import { cookies } from "../headersToken";
import logo from "../../assets/logo.png";
import Sidebar from "./sidebar/Sidebar";
import toggleSidebar from "./sidebar/toggleSidebar";

function Navbar() {

  return (
    <>
      <nav className="navbar">
        <Link
          className="navbar-brand"
          to={"/"}
        >
          <img src={logo} width="250" alt="logo" id="logo" />
        </Link>
        {cookies.get("token") && <button
          type="button"
          className="border-0 me-3"
          onClick={cookies.get("token") ? toggleSidebar : null}
        >
          <i
            className="fa-solid fa-bars"
            style={{ backgroundColor: "transparent", color: "#000" }}
          ></i>
        </button>}
      </nav>
      <Sidebar />
    </>
  );
}

export default Navbar;
