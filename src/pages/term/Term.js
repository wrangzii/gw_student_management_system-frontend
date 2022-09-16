import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigateAction from "~/components/navigateAction/NavigateAction";
import { TermCreate, TermUpdate, TermView, TermViewDetail } from "./";

function Term() {
  return (
    <div className="term">
      <NavigateAction title={"term"} />
      <Routes>
        <Route path="/create" element={<TermCreate />} />
        <Route path="/view" element={<TermView />} />
        <Route path="/view/detail/:id" element={<TermViewDetail />} />
        <Route path="update/:id" element={<TermUpdate />} />
      </Routes>
    </div>
  );
}

export default Term;
