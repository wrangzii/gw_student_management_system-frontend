import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { HandlerBtns, Loading, UserExecuted } from "~/components";
import { useAuth } from "~/store/auth";
import Update from "~/components/crud/Update";
import HeadingTitle from "~/components/headingTitle/HeadingTitle";
import httpRequest from "~/utils/httpRequest";

import styles from "~/styles/components/form.module.scss";

function StudentClassUpdate() {
  const form = "update";
  const [departmentName, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();
  const { auth } = useAuth();
  const modifyBy = auth?.user?.username;
  const navigate = useNavigate();

  // Get current info
  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`department/${id}`)
      .then((result) => {
        const data = result?.data?.data;
        setDepartmentName(data.departmentName);
        setDescription(data.description);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  }, [id]);

  // Handle update department
  const handleUpdateDepartment = (e) => {
    setIsLoaded(false);
    httpRequest
      .put(`department/edit/${id}`, {
        departmentName,
        description,
        modifyBy,
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
        <form onSubmit={handleUpdateDepartment} className="form-group">
          <HeadingTitle title={"student class"} form={form} />
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

export default StudentClassUpdate;
