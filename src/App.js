import Login from "./components/pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import User from "./components/pages/user/User";
import Role from "./components/pages/role/Role";
import Student from "./components/pages/student/Student";
import Program from "./components/pages/program/Program";
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetPassword from "./components/pages/ResetPassword";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route index element={<Login />} />
          <Route path="/user/*" element={<User />} />
          <Route path="/role/*" element={<Role />} />
          <Route path="/student/*" element={<Student />} />
          <Route path="/program/*" element={<Program />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
