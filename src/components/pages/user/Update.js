import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { headers, cookies } from "../../headersToken";
import ActionBtns from "../../partials/ActionBtns";

function Update() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [modifyBy, setModifyBy] = useState(cookies.get("username"));
  const [role, setRole] = useState([]);
  const [departmentId, setDepartmentId] = useState(0);
  const [department, setDepartment] = useState([]);
  const { id } = useParams();
  const role_dropdown = useRef();

  // Get current info
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/users/${id}`,
      headers,
    })
      .then((result) => {
        setEmail(result.data.data.email);
        setPhoneNumber(result.data.data.phoneNumber);
        setDob(result.data.data.dob);
        setAddress(result.data.data.address);
        setFullName(result.data.data.fullName);
        setModifyBy(result.data.data.modifyBy);
        setRole(result.data.data.role);
        setDepartmentId(result.data.data.departmentId);
        return result.data.data;
      })
      .then((result) => {
        role_dropdown.current = result.roles.map((role) => ({
          value: role.roleId,
          label: role.roleName,
        }));
      });
  }, [id]);

  // Handle change dropdown
  const handleChange = (e) => {
    setRole(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  // Handle update user
  const handleUpdateUser = (e) => {
    e.preventDefault();
  };

  return (
    <div className="user-create">
      <form onSubmit={handleUpdateUser} className="form-group">
        <h2 className="form-heading bg-warning text-white text-center">
          UPDATING A NEW USER
        </h2>
        <div className="form-body d-flex">
          <div className="form-body__left">
            <div className="fullname form-group d-flex">
              <label htmlFor="fullname">Fullname</label>
              <input
                type="text"
                placeholder="Nguyen Van A"
                defaultValue={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="email form-group d-flex">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="manager@fe.edu.vn"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="phone form-group d-flex">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                placeholder="0902345011"
                defaultValue={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="dob form-group d-flex">
              <label htmlFor="dob">Birthday</label>
              <input
                type="date"
                defaultValue={new Date(dob).toLocaleDateString()}
                onChange={(e) =>
                  setDob(new Date(e.target.value).toLocaleDateString())
                }
                className="form-control"
              />
            </div>
            <div className="address form-group d-flex">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                placeholder="20 Cong Hoa, Tan Binh"
                defaultValue={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-body__right">
            <div className="username form-group d-flex">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="nguyenvana"
                defaultValue={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="password form-group d-flex">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="role-dropdown dropdown d-flex">
              <label htmlFor="role">Role</label>
              <Select
                isMulti
                options={role_dropdown.current}
                defaultValue={role_dropdown.current}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
              />
            </div>
            <div className="department-dropdown dropdown d-flex">
              <label htmlFor="departments">Department</label>
              <select
                className="form-select"
                defaultValue={departmentId}
                onChange={(e) => setDepartmentId(parseInt(e.target.value))}
              >
                {department.map((depart) => (
                  <option
                    key={depart.departmentId}
                    value={parseInt(depart.departmentId)}
                  >
                    {depart.departmentName}
                  </option>
                ))}
              </select>
            </div>
            <div className="createBy form-group d-flex">
              <label htmlFor="createBy">Created By</label>
              <input
                type="text"
                readOnly
                defaultValue={modifyBy}
                className="form-control"
              />
            </div>
            <ActionBtns action={"Update"} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Update;
