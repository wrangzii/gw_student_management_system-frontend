import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { cookies } from "./components/headersToken";
import Navbar from "./components/partials/Navbar";
import Login from "./components/pages/authentication/Login";
import ForgotPassword from "./components/pages/authentication/ForgotPassword";
import ResetPassword from "./components/pages/authentication/ResetPassword";
import User from "./components/pages/user/User";
import Role from "./components/pages/role/Role";
import Student from "./components/pages/student/Student";
import Program from "./components/pages/program/Program";
import Department from "./components/pages/department/Department";
import Dashboard from "./components/pages/dashboard/Dashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            index
            element={cookies.get("token") ? <Dashboard /> : <Login />}
          />
          <Route path="/user/*" element={<User />} />
          <Route path="/role/*" element={<Role />} />
          <Route path="/department/*" element={<Department />} />
          <Route path="/student/*" element={<Student />} />
          <Route path="/program/*" element={<Program />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/confirm_reset" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
