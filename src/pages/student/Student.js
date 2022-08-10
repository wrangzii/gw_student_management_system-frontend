import React from "react";
import { Routes, Route } from "react-router-dom";

import NavigateAction from "~/components/navigateAction/NavigateAction";
import Grade from "../grade/Grade";
import {
  StudentCreate,
  StudentUpdate,
  StudentView,
  StudentViewDetail,
} from "./";

function Student() {
  return (
    <div className="student">
      <NavigateAction title={"student"} />
      <Routes>
        <Route path="create" element={<StudentCreate />} />
        <Route path="view" element={<StudentView />} />
        <Route path="view/detail/:id" element={<StudentViewDetail />} />
        <Route path="view/detail/:id/grade" element={<Grade />} />
        <Route path="update/:id" element={<StudentUpdate />} />
      </Routes>
    </div>
  );
}

export default Student;
