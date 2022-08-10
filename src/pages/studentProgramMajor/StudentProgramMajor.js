import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigateAction from "~/components/navigateAction/NavigateAction";
import {
  StudentProgramMajorCreate,
  StudentProgramMajorUpdate,
  StudentProgramMajorView,
  StudentProgramMajorViewDetail,
} from "./";

function StudentProgramMajor() {
  return (
    <div className="studentProgramMajor">
      <NavigateAction title={"student-Program-Major"} />
      <Routes>
        <Route path="/create" element={<StudentProgramMajorCreate />} />
        <Route path="/view" element={<StudentProgramMajorView />} />
        <Route
          path="/view/detail/:id"
          element={<StudentProgramMajorViewDetail />}
        />
        <Route path="update/:id" element={<StudentProgramMajorUpdate />} />
      </Routes>
    </div>
  );
}

export default StudentProgramMajor;
