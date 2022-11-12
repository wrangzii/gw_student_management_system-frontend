import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigateAction from "~/components/navigateAction/NavigateAction";
import {
  StudentClassCreate,
  StudentClassUpdate,
  StudentClassView,
  StudentClassViewDetail,
  AddStudent,
} from "./";

function StudentClass() {
  return (
    <div className="class">
      <NavigateAction title={"class"} route={"student-class"} />
      <Routes>
        <Route path="/create" element={<StudentClassCreate />} />
        <Route path="/view" element={<StudentClassView />} />
        <Route path="/view/detail/:id" element={<StudentClassViewDetail />} />
        {/* <Route path="update/:id" element={<StudentClassUpdate />} /> */}
        <Route path="/add-student/:id" element={<AddStudent />} />
      </Routes>
    </div>
  );
}

export default StudentClass;
