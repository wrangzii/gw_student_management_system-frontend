import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigateAction from "~/components/partials/navigateAction/NavigateAction";
import { UserCreate, UserUpdate, UserView, UserViewDetail } from "./";

function User() {
  return (
    <div className="user">
      <div className="container">
        <NavigateAction title={"user"} />
        <Routes>
          <Route path="/create" element={<UserCreate />} />
          <Route path="/view" element={<UserView />} />
          <Route path="/view/detail/:id" element={<UserViewDetail />} />
          <Route path="/update/:id" element={<UserUpdate />} />
        </Routes>
      </div>
    </div>
  );
}

export default User;
