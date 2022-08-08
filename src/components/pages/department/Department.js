import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import NavigateAction from "~/components/partials/navigateAction/NavigateAction";
import {
  DepartmentCreate,
  DepartmentUpdate,
  DepartmentView,
  DepartmentViewDetail,
} from "./";

function Department() {
  return (
    <div className="department">
      <div className="container">
        <NavigateAction title={"department"} />
        <Routes>
          <Route path="/create" element={<DepartmentCreate />} />
          <Route path="/view" element={<DepartmentView />} />
          <Route path="/view/detail/:id" element={<DepartmentViewDetail />} />
          <Route path="update/:id" element={<DepartmentUpdate />} />
        </Routes>
      </div>
    </div>
  );
}

export default Department;
