import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Create, Update, View, ViewDetail } from "./";

function Role() {
  return (
    <div className="role">
      <div className="container">
        <ul>
          <li className="text-success">
            <h1>Role</h1>
          </li>
          <Link to={"/role/view"}>
            <li className="text-success">View</li>
          </Link>
          <Link to={"/role/create"}>
            <li className="text-success">Create</li>
          </Link>
        </ul>
        <Routes>
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<View />} />
          <Route path="/view/detail/:id" element={<ViewDetail />} />
          <Route path="update/:id" element={<Update />} />
        </Routes>
      </div>
    </div>
  );
}

export default Role;
