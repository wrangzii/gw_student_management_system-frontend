import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigateAction from "~/components/navigateAction/NavigateAction";
import {
  ClassCreate,
  ClassUpdate,
  ClassView,
  ClassViewDetail,
} from "./";

function Class() {
  return (
    <div className="class">
      <NavigateAction title={"class"} />
      <Routes>
        <Route path="/create" element={<ClassCreate />} />
        <Route path="/view" element={<ClassView />} />
        <Route path="/view/detail/:id" element={<ClassViewDetail />} />
        <Route path="update/:id" element={<ClassUpdate />} />
      </Routes>
    </div>
  );
}

export default Class;
