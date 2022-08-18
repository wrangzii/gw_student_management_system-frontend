import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Select from "react-select";

import Create from "~/components/crud/Create";
import { headers } from "~/utils/headersToken";
import { ErrorHandler, HandlerBtns, Loading, UserExecuted } from "~/components";
import { useAuth } from "~/store/auth";

import styles from "~/styles/components/form.module.scss";
import HeadingTitle from "~/components/headingTitle/HeadingTitle";
import httpRequest from "~/utils/httpRequest";

function UserCreate() {
  const form = "create";
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState([]);
  const [departmentId, setDepartmentId] = useState(null);
  const [department, setDepartment] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  let role_dropdown = useRef();
  const { auth } = useAuth();
  const createBy = auth?.user?.username;
  const navigate = useNavigate();

  // Get role list
  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`role/all?pageNumber=${pageNumber}`)
      .then((result) => {
        setRole(result?.data);
        return result.data;
      })
      .then((result) => {
        role_dropdown.current = result?.map((role) => ({
          value: role.roleName,
          label: role.roleName,
        }));
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  }, []);

  // Get departments
  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`department/all?pageNumber=${pageNumber}`)
      .then((result) => {
        setDepartment(result?.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  }, []);

  // Handle create user
  const handleCreateUser = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    httpRequest
      .post("users/add", {
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
      })
      .then((result) => {
        result && navigate("../view");
        setIsLoaded(true);
      })
      .catch((error) => {
        error?.response?.status === 400 && setIsError(true);
        setIsLoaded(true);
      });
  };

  // Handle change select
  const handleChange = (e) => {
    setRole(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  return (
    <Create>
      {isLoaded ? (
        <form onSubmit={handleCreateUser} className="form-group">
          <HeadingTitle title={"user"} form={form} />
          <div className={styles["form-body"]}>
            {isError ? (
              <ErrorHandler name={`"${email}"`} msg={"is already taken!"} />
            ) : null}
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsError(false);
                  }}
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
                  onChange={(e) => setDepartmentId(parseInt(e.target.value))}
                  onClick={() => setIsDisabled(true)}
                >
                  <option
                    defaultValue=""
                    disabled={isDisabled}
                  >
                    --Select department--
                  </option>
                  {department &&
                    department.map((depart) => (
                      <option
                        key={depart.departmentId}
                        value={depart.departmentId}
                      >
                        {depart.departmentName}
                      </option>
                    ))}
                </select>
              </div>
              <UserExecuted type={form} />
              <HandlerBtns action={form} />
            </div>
          </div>
        </form>
      ) : (
        <Loading />
      )}
    </Create>
  );
}

export default UserCreate;
