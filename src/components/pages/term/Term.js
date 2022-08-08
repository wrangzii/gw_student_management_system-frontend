import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigateAction from "~/components/partials/navigateAction/NavigateAction";
import {
  TermCreate,
  TermUpdate,
  TermView,
  TermViewDetail,
} from "./";

function Term() {
  return (
    <div className="department">
      <div className="container">
        <NavigateAction title={"department"} />
        <Routes>
          <Route path="/create" element={<TermCreate />} />
          <Route path="/view" element={<TermView />} />
          <Route path="/view/detail/:id" element={<TermViewDetail />} />
          <Route path="update/:id" element={<TermUpdate />} />
        </Routes>
      </div>
    </div>
  );
}

export default Term;
