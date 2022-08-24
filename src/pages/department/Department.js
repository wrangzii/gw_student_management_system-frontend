import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigateAction from "~/components/navigateAction/NavigateAction";
import {
  DepartmentCreate,
  DepartmentUpdate,
  DepartmentView,
  DepartmentViewDetail,
} from "./";

function Department() {
  return (
    <div className="department">
      <NavigateAction title={"department"} />
      <Routes>
        <Route path="/create" element={<DepartmentCreate />} />
        <Route path="/view" element={<DepartmentView />} />
        <Route path="/view/detail/:id" element={<DepartmentViewDetail />} />
        <Route path="update/:id" element={<DepartmentUpdate />} />
      </Routes>
    </div>
  );
}

export default Department;
