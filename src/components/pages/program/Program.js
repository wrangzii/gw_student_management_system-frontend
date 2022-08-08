import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigateAction from "~/components/partials/navigateAction/NavigateAction";
import {
  ProgramCreate,
  ProgramUpdate,
  ProgramView,
  ProgramViewDetail,
} from "./";

function Program() {
  return (
    <div className="program">
      <div className="container">
        <NavigateAction title={"program"} />
        <Routes>
          <Route path="/create" element={<ProgramCreate />} />
          <Route path="/view" element={<ProgramView />} />
          <Route path="/view/detail/:id" element={<ProgramViewDetail />} />
          <Route path="/update/:id" element={<ProgramUpdate />} />
        </Routes>
      </div>
    </div>
  );
}

export default Program;
