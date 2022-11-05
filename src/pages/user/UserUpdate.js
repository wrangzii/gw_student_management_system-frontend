import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Select from "react-select";

import { HandlerBtns, Loading, UserExecuted } from "~/components";
import { useAuth } from "~/store/auth";
import Update from "~/components/crud/Update";
import HeadingTitle from "~/components/headingTitle/HeadingTitle";
import httpRequest from "~/utils/httpRequest";

import styles from "~/styles/components/form.module.scss";

function UserUpdate() {
  const { id } = useParams();
  const { auth } = useAuth();
  const form = "update";
  const [data, setData] = useState({
    email: "",
    phoneNumber: "",
    dob: "",
    address: "",
    fullName: "",
    role: "",
    departmentId: "",
    modifyBy: auth?.user?.username,
  });
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  // Get role list
  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`role/all?pageNumber=0`)
      .then((result) => {
        setRoles(
          result?.data.map((role) => {
            return {
              value: role.roleName,
              label: role.roleName,
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

  // Get department list
  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`department/all?pageNumber=0`)
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

  // Get current info
  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`users/filter?pageNumber=0&search=userId:${id}`)
      .then((result) => {
        const data = result?.data?.data[0];
        setData({
          email: data.email,
          phoneNumber: data.phoneNumber,
          dob: new Date(data.dob).toISOString().slice("T", 10),
          address: data.address,
          fullName: data.fullName,
          role: data?.roles?.map((role) => {
            return {
              value: role?.roleName,
              label: role?.roleName,
            };
          }),
          departmentId: data?.departmentId?.departmentName,
        });
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  }, [id]);

  // handle change value
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
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

  // Handle update user
  const handleUpdateUser = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    httpRequest
      .put(`users/edit/${id}`, data)
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
                  defaultValue={data.fullName}
                  onChange={handleChange}
                  className="form-control"
                  name="fullName"
                />
              </div>
              <div className="email form-group d-flex">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  placeholder="manager@fe.edu.vn"
                  defaultValue={data.email}
                  onChange={handleChange}
                  className="form-control"
                  name="email"
                />
              </div>
              <div className="phone form-group d-flex">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  placeholder="0902345011"
                  defaultValue={data.phoneNumber}
                  onChange={handleChange}
                  className="form-control"
                  name="phoneNumber"
                />
              </div>
              <div className="dob form-group d-flex">
                <label htmlFor="dob">Birthday</label>
                <input
                  type="date"
                  defaultValue={data.dob}
                  onChange={handleChange}
                  className="form-control"
                  name="dob"
                />
              </div>
            </div>
            <div className="form-body__right">
              <div className="address form-group d-flex">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  placeholder="20 Cong Hoa, Tan Binh"
                  defaultValue={data.address}
                  onChange={handleChange}
                  className="form-control"
                  name="address"
                />
              </div>
              <div className="role-dropdown dropdown d-flex">
                <label htmlFor="role">Role</label>
                <Select
                  isMulti
                  name="roles"
                  options={roles}
                  defaultValue={data?.role !== [] ? data.role : []}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(e) => handleChangeSelect(e)}
                />
              </div>
              <div className="department-dropdown dropdown d-flex">
                <label htmlFor="department">Department</label>
                <select
                  className="form-select"
                  defaultValue={data.departmentId}
                  onChange={handleChange}
                  name="departmentId"
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
