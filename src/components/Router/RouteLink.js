import React, { useContext } from "react";
import Cookies from "js-cookie";
import { Routes, Navigate, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../authentication/Login";
import ForgotPassword from "../authentication/ForgotPassword";
import ResetPassword from "../authentication/ResetPassword";
import User from "../pages/user/User";
import Role from "../pages/role/Role";
import Student from "../pages/student/Student";
import Program from "../pages/program/Program";
import Department from "../pages/department/Department";
import Dashboard from "../pages/dashboard/Dashboard";
import NotFound from "../pages/NotFound";
import AuthApi from "../authentication/AuthApi";

function RouteLink() {
  const Auth = useContext(AuthApi);
  return (
    <Routes>
      {/* <Route path="/" auth={Auth.auth} element={<Login />} />
      <Route
        path="/"
        auth={Auth.auth}
        element={<Dashboard />}
      /> */}
      <Route path="/" element={!Cookies.get("token") ? <Login /> : <Dashboard />} />
      <Route path="/user/*" element={<User />} />
      <Route path="/role/*" element={<Role />} />
      <Route path="/department/*" element={<Department />} />
      <Route path="/student/*" element={<Student />} />
      <Route path="/program/*" element={<Program />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/confirm_reset" element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RouteLink;
