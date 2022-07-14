import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Create, Update, View, ViewDetail } from "./";

function Program() {
  return (
    <div className="program">
      <div className="container">
        <ul>
          <li className="text-success">
            <h1>Program</h1>
          </li>
          <Link to={"/program/view"}>
            <li className="text-success">View</li>
          </Link>
          <Link to={"/program/create"}>
            <li className="text-success">Create</li>
          </Link>
        </ul>
        <Routes>
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<View />} />
          <Route path="/view/detail/:id" element={<ViewDetail />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </div>
    </div>
  );
}

export default Program;
