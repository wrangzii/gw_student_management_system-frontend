import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { headers, Cookies } from "../../headersToken";
import HandlerBtns from "../../partials/HandlerBtns";
import Loading from "../../partials/Loading/Loading";
import ModifiedBy from "../../partials/ModifiedBy";

function Update() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const modifyBy = Cookies.get("username");
  const [role, setRole] = useState([]);
  const [departmentId, setDepartmentId] = useState(null);
  const [departments, setDepartments] = useState([]);
  const { id } = useParams();
  const role_current = useRef();
  const role_dropdown = useRef();
  const navigate = useNavigate();

  // Get current info
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/users/${id}`,
      headers,
    })
      .then((result) => {
        if (result) {
          setEmail(result.data.data.email);
          setPhoneNumber(result.data.data.phoneNumber);
          setDob(new Date(result.data.data.dob).toISOString());
          setAddress(result.data.data.address);
          setFullName(result.data.data.fullName);
          setRole(result.data.data.roles.map((role) => role.roleName));
          setDepartmentId(result.data.data.departmentId.departmentId);
        }
        return result.data.data;
      })
      .then((result) => {
        // Get user's current role
        role_current.current = result.roles.map((role) => ({
          value: role.roleName,
          label: role.roleName,
        }));
      });
  }, [id]);

  // Get role list
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/role/all?pageNumber=0`,
      headers,
    })
      .then((result) => {
        if (result) return result.data;
      })
      .then((result) => {
        role_dropdown.current = result.map((role) => ({
          value: role.roleName,
          label: role.roleName,
        }));
      });
  }, []);

  // Get department list
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/department/all?pageNumber=0`,
      headers,
    }).then((result) => {
      if (result) setDepartments(result.data);
    });
  }, []);

  // Handle change dropdown
  const handleChange = (e) => {
    setRole(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  // Handle update user
  const handleUpdateUser = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: `http://localhost:8080/users/edit/${id}`,
      headers,
      data: JSON.stringify({
        email,
        phoneNumber,
        dob,
        address,
        fullName,
        modifyBy,
        role,
        departmentId,
      }),
    }).then((result) => (result ? navigate("../view") : null));
  };

  return (
    <div className="user-create">
      {departmentId ? (
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
                  defaultValue={dob.slice("T", 10)}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDob(e.target.value);
                  }}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-body__right">
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
              <div className="role-dropdown dropdown d-flex">
                <label htmlFor="role">Role</label>
                <Select
                  isMulti
                  name="roles"
                  options={role_dropdown.current}
                  defaultValue={role_current.current}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleChange}
                />
              </div>
              <div className="department-dropdown dropdown d-flex">
                <label htmlFor="department">Department</label>
                <select
                  className="form-select"
                  defaultValue={departmentId}
                  onChange={(e) => setDepartmentId(parseInt(e.target.value))}
                >
                  {departments.length > 0 &&
                    departments.map((department) => (
                      <option
                        key={department.departmentId}
                        name={departments.departmentName}
                        value={parseInt(department.departmentId)}
                      >
                        {department.departmentName}
                      </option>
                    ))}
                </select>
              </div>
              <ModifiedBy />
              <HandlerBtns action={"Update"} />
            </div>
          </div>
        </form>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Update;
