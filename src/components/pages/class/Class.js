import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Create, Update, View, ViewDetail } from "./";

function Class() {
  return (
    <div className="class">
      <div className="container">
        <ul>
          <li className="text-success">
            <h1>Class</h1>
          </li>
          <Link to={"/class/view"}>
            <li className="text-success">View</li>
          </Link>
          <Link to={"/class/create"}>
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

export default Class;
