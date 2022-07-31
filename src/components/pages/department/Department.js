import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Create, Update, View, ViewDetail } from "./";

function Department() {
  return (
    <div className="department">
      <div className="container">
        <ul>
          <li className="text-success">
            <h1>Department</h1>
          </li>
          <Link to={"/department/view"}>
            <li className="text-success">View</li>
          </Link>
          <Link to={"/department/create"}>
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

export default Department;
