import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { headers, cookies } from "../../headersToken";
import ActionBtns from "../../partials/ActionBtns";

function Create() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const createBy = cookies.get("username");
  const [role, setRole] = useState([]);
  const [departmentId, setDepartmentId] = useState(1);
  const [department, setDepartment] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  let role_dropdown = useRef();
  let department_dropdown = useRef();
  const navigate = useNavigate();

  // Get role
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/role/all?pageNumber=${pageNumber}`,
      headers,
    })
      .then((result) => {
        if (result) {
          setRole(result.data);
        }
        return result.data;
      })
      .then((result) => {
        role_dropdown.current = result.map((role) => ({
          value: role.roleName,
          label: role.roleName,
        }));
      });
  }, []);

  // Get departments
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/department/all?pageNumber=${pageNumber}`,
      headers,
    })
      .then((result) => {
        if (result) {
          setDepartment(result.data);
        }
        return result.data;
      })
      .then((result) => {
        department_dropdown.current = result.map((department) => ({
          value: department.departmentId,
          label: department.departmentName,
        }));
      });
  }, []);

  // Handle create user
  const handleCreateUser = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:8080/users/add",
      headers: {
        Authorization: "Bearer " + cookies.get("token"),
        "Content-Type": "application/json",
      },
      data: {
        email,
        username,
        password,
        phoneNumber,
        dob,
        address,
        fullName,
        createBy,
        role,
        departmentId,
      },
    }).then((result) => {
      if (result.data) {
        navigate("../view");
      }
    });
  };

  // Handle change select
  const handleChange = (e) => {
    setRole(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  return (
    <div className="user-create">
      <form onSubmit={handleCreateUser} className="form-group">
        <h2 className="form-heading bg-success text-white text-center">
          CREATING A NEW USER
        </h2>
        <div className="form-body d-flex">
          <div className="form-body__left">
            <div className="fullname form-group d-flex">
              <label htmlFor="fullname">Fullname</label>
              <input
                type="text"
                name="fullname"
                placeholder="Nguyen Van A"
                onChange={(e) => setFullName(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="email form-group d-flex">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="manager@fe.edu.vn"
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="phone form-group d-flex">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="0902345011"
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="dob form-group d-flex">
              <label htmlFor="dob">Birthday</label>
              <input
                type="date"
                name="dob"
                onChange={(e) => setDob(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="address form-group d-flex">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                placeholder="20 Cong Hoa, Tan Binh"
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
                name="username"
                placeholder="nguyenvana"
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="password form-group d-flex">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="role-dropdown dropdown d-flex">
              <label htmlFor="role">Role</label>
              <Select
                isMulti
                name="roles"
                options={role_dropdown.current}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
              />
            </div>
            <div className="department-dropdown dropdown d-flex">
              <label htmlFor="departments">Department</label>
              <select
                name="department"
                className="form-select"
                defaultValue={departmentId}
                onChange={(e) => {
                  setDepartmentId(parseInt(e.target.value));
                }}
              >
                {department.map((depart) => (
                  <option key={depart.departmentId} value={depart.departmentId}>
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
                value={createBy}
                className="form-control"
              />
            </div>
            <ActionBtns action={"Create"} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Create;
