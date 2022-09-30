import React, { useState, useEffect } from "react";

import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";

import Create from "~/components/crud/Create";
import HeadingTitle from "~/components/headingTitle/HeadingTitle";
import { ErrorHandler, HandlerBtns, Loading, UserExecuted } from "~/components";
import { useAuth } from "~/store/auth";
import httpRequest from "~/utils/httpRequest";

import styles from "~/styles/components/form.module.scss";

function UserCreate() {
  const { auth } = useAuth();
  const form = "create";
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
    phoneNumber: "",
    dob: "",
    address: "",
    fullName: "",
    role: [],
    departmentId: "",
    createBy: auth?.user?.username,
  });
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [emailList, setEmailList] = useState("");

  // Get role list
  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`role/all?pageNumber=${pageNumber}`)
      .then((result) => {
        setRoles(
          result?.data.map((role) => {
            return {
              label: role.roleName,
              value: role.roleName,
            };
          })
        );
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
        const data = result?.data?.data;
        setDepartments(data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  }, []);

  // Check duplicate email
  // 1. Get email from list user (1)
  const callListUser = () => {
    httpRequest
      .get(`users/all?pageNumber=${pageNumber}`)
      .then((result) => {
        // setEmailList(result?.data?.map((item) => item?.email));
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  };
  window.onload = callListUser;

  // 2. Check if current email-input is included in (1)
  // const checkCurrentEmail = () => {
  //   emailList.includes(email) ? setIsError(true) : setIsError(false);
  // };

  // const handleOnBlur = () => {
  //   if (email.trim() && email.includes("@")) {
  //     checkCurrentEmail();
  //   }
  // };

  // handle change value
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // Handle create user
  const handleCreateUser = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    httpRequest
      .post("users/add", data)
      .then((result) => {
        result && toast("User registered successfully!");
        setIsLoaded(true);
      })
      .catch((error) => {
        error?.response?.status === 400 && setIsError(true);
        setIsLoaded(true);
      });
  };

  // Handle change select
  const handleChangeSelect = (selectedOption) => {
    const roles = [];
    selectedOption.map((role) => roles.push(role.value));
    setData({
      ...data,
      role: roles,
    });
  };

  return (
    <Create>
      <ToastContainer />
      {isLoaded ? (
        <form onSubmit={handleCreateUser} className="form-group">
          <HeadingTitle title={"user"} form={form} />
          <div className={styles["form-body"]}>
            {isError ? (
              <ErrorHandler
                name={`"${data.email}"`}
                msg={"is already taken!"}
              />
            ) : null}
            <div className="form-body__left">
              <div className="fullname form-group d-flex">
                <label htmlFor="fullname">Fullname</label>
                <input
                  required
                  type="text"
                  name="fullName"
                  placeholder="Nguyen Van A"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="email form-group d-flex">
                <label htmlFor="email">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="manager@fe.edu.vn"
                  onChange={handleChange}
                  // onBlur={handleOnBlur}
                  className="form-control"
                />
              </div>
              <div className="phone form-group d-flex">
                <label htmlFor="phone">Phone Number</label>
                <input
                  required
                  type="tel"
                  name="phoneNumber"
                  placeholder="0902345011"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="dob form-group d-flex">
                <label htmlFor="dob">Birthday</label>
                <input
                  required
                  type="date"
                  name="dob"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="address form-group d-flex">
                <label htmlFor="address">Address</label>
                <input
                  required
                  type="text"
                  name="address"
                  placeholder="20 Cong Hoa, Tan Binh"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-body__right">
              <div className="username form-group d-flex">
                <label htmlFor="username">Username</label>
                <input
                  required
                  type="text"
                  name="username"
                  placeholder="nguyenvana"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="password form-group d-flex">
                <label htmlFor="password">Password</label>
                <input
                  required
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="role-dropdown dropdown d-flex">
                <label htmlFor="role">Role</label>
                <Select
                  required
                  isMulti
                  name="role"
                  options={roles}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(e) => handleChangeSelect(e)}
                />
              </div>
              <div className="department-dropdown dropdown d-flex">
                <label htmlFor="departments">Department</label>
                <select
                  required
                  name="departmentId"
                  className="form-select"
                  onChange={handleChange}
                >
                  <option>--Select department--</option>
                  {departments?.map((department) => (
                    <option
                      key={department.departmentId}
                      value={department.departmentId}
                    >
                      {department.departmentName}
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
