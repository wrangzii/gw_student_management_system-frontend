import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigateAction from "~/components/navigateAction/NavigateAction";
import { RoleCreate, RoleUpdate, RoleView, RoleViewDetail } from "./";

function Role() {
  return (
    <div className="role">
      <NavigateAction title={"role"} />
      <Routes>
        <Route path="/create" element={<RoleCreate />} />
        <Route path="/view" element={<RoleView />} />
        <Route path="/view/detail/:id" element={<RoleViewDetail />} />
        <Route path="update/:id" element={<RoleUpdate />} />
      </Routes>
    </div>
  );
}

export default Role;
