import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigateAction from "~/components/partials/navigateAction/NavigateAction";
import {
  MajorCreate,
  MajorUpdate,
  MajorView,
  MajorViewDetail,
} from "./";

function Major() {
  return (
    <div className="major">
      <div className="container">
        <NavigateAction title={"major"} />
        <Routes>
          <Route path="/create" element={<MajorCreate />} />
          <Route path="/view" element={<MajorView />} />
          <Route path="/view/detail/:id" element={<MajorViewDetail />} />
          <Route path="update/:id" element={<MajorUpdate />} />
        </Routes>
      </div>
    </div>
  );
}

export default Major;
