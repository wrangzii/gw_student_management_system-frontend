import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import { headers } from "~/utils/headersToken";
import { HandlerBtns, Loading, UserExecuted } from "~/components";
import { useAuth } from "~/store/auth";
import Update from "~/components/crud/Update";
import HeadingTitle from "~/components/headingTitle/HeadingTitle";

import styles from "~/styles/components/form.module.scss";

function DepartmentUpdate() {
  const form = "update";
  const [departmentName, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const { auth } = useAuth();
  const modifyBy = auth.username;
  const navigate = useNavigate();

  // Get current info
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/department/${id}`,
      headers,
    }).then((result) => {
      setDepartmentName(result.data.data.departmentName);
      setDescription(result.data.data.description);
    });
  }, [id]);

  // Handle update department
  const handleUpdateDepartment = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: `http://localhost:8080/department/edit/${id}`,
      headers,
      data: JSON.stringify({ departmentName, description, modifyBy }),
    }).then((result) => (result ? navigate("../view") : null));
  };
  return (
    <Update>
      {departmentName ? (
        <form onSubmit={handleUpdateDepartment} className="form-group">
          <HeadingTitle title={"department"} form={form} />
          <div className={styles["form-body"]}>
            <div className="d-flex">
              <label htmlFor="department">Department</label>
              <input
                type="text"
                className="form-control"
                defaultValue={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                placeholder="Accountant Leader"
              />
            </div>
            <div className="d-flex">
              <label htmlFor="description">Description</label>
              <textarea
                cols="30"
                rows="2"
                className="form-control"
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <UserExecuted type={form} />
            <HandlerBtns action={form} />
          </div>
        </form>
      ) : (
        <Loading />
      )}
    </Update>
  );
}

export default DepartmentUpdate;
