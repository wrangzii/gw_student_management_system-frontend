import React from "react";
import { Routes, Route } from "react-router-dom";

import NavigateAction from "~/components/partials/navigateAction/NavigateAction";
import {
  StudentCreate,
  StudentUpdate,
  StudentView,
  StudentViewDetail,
} from "./";

function Student() {
  return (
    <div className="student">
      <div className="container">
        <NavigateAction title={"student"} />
        <Routes>
          <Route path="/create" element={<StudentCreate />} />
          <Route path="/view" element={<StudentView />} />
          <Route path="/view/detail/:id" element={<StudentViewDetail />} />
          <Route path="/update/:id" element={<StudentUpdate />} />
        </Routes>
      </div>
    </div>
  );
}

export default Student;
