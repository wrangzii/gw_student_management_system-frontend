import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Select from "react-select";

import { HandlerBtns, Loading, UserExecuted } from "~/components";
import { useAuth } from "~/store/auth";
import Update from "~/components/crud/Update";
import HeadingTitle from "~/components/headingTitle/HeadingTitle";
import httpRequest from "~/utils/httpRequest";

import styles from "~/styles/components/form.module.scss";

function UserUpdate() {
  const form = "update";
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState([]);
  const [departmentId, setDepartmentId] = useState(null);
  const [departments, setDepartments] = useState([]);
  const role_current = useRef();
  const role_dropdown = useRef();
  const { auth } = useAuth();
  const modifyBy = auth?.user?.username;
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  // Get current info
  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`users/${id}`)
      .then((result) => {
        const data = result?.data?.data;
        setEmail(data.email);
        setPhoneNumber(data.phoneNumber);
        setDob(new Date(data.dob).toISOString());
        setAddress(data.address);
        setFullName(data.fullName);
        setRole(data.roles.map((role) => role.roleName));
        setDepartmentId(data.departmentId.departmentId);
        return data;
      })
      .then((result) => {
        // Get user's current role
        role_current.current = result?.roles.map((role) => ({
          value: role?.roleName,
          label: role?.roleName,
        }));
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  }, [id]);

  // Get role list
  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`role/all?pageNumber=0`)
      .then((result) => {
        role_dropdown.current = result?.data?.map((role) => ({
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

  // Get department list
  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`department/all?pageNumber=0`)
      .then((result) => {
        setDepartments(result?.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  }, []);

  // Handle change dropdown
  const handleChange = (e) => {
    setRole(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  // Handle update user
  const handleUpdateUser = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    httpRequest
      .put(`users/edit/${id}`, {
        email,
        phoneNumber,
        dob,
        address,
        fullName,
        modifyBy,
        role,
        departmentId,
      })
      .then((result) => {
        result && navigate("../view");
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  };

  return (
    <Update>
      {isLoaded ? (
        <form onSubmit={handleUpdateUser} className="form-group">
          <HeadingTitle title={"user"} form={form} />
          <div className={styles["form-body"]}>
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
              <UserExecuted type={form} />
              <HandlerBtns action={form} />
            </div>
          </div>
        </form>
      ) : (
        <Loading />
      )}
    </Update>
  );
}

export default UserUpdate;
