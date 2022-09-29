import React from "react";
import { Routes, Route } from "react-router-dom";

import NavigateAction from "~/components/navigateAction/NavigateAction";
import {
  StudentCreate,
  StudentUpdate,
  StudentView,
  StudentViewDetail,
} from "./";

import { ImportGrade, ViewGrade } from "./Grade";

function Student() {
  return (
    <div className="student">
      <NavigateAction title={"student"} />
      <Routes>
        <Route path="create" element={<StudentCreate />} />
        <Route path="view" element={<StudentView />} />
        <Route path="view/detail/:id" element={<StudentViewDetail />} />
        <Route path="view/detail/:id/import-grade" element={<ImportGrade />} />
        <Route path="view/detail/:id/view-grade" element={<ViewGrade />} />
        <Route path="update/:id" element={<StudentUpdate />} />
      </Routes>
    </div>
  );
}

export default Student;
