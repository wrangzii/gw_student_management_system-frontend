import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigateAction from "~/components/partials/navigateAction/NavigateAction";
import {
  SubjectCreate,
  SubjectUpdate,
  SubjectView,
  SubjectViewDetail,
} from "./";

function Subject() {
  return (
    <div className="subject">
      <div className="container">
        <NavigateAction title={"subject"} />
        <Routes>
          <Route path="/create" element={<SubjectCreate />} />
          <Route path="/view" element={<SubjectView />} />
          <Route path="/view/detail/:id" element={<SubjectViewDetail />} />
          <Route path="update/:id" element={<SubjectUpdate />} />
        </Routes>
      </div>
    </div>
  );
}

export default Subject;
