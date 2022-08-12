import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import { headers } from "~/utils/headersToken";
import { HandlerBtns, Loading, UserExecuted } from "~/components";
import { useAuth } from "~/store/auth";
import Update from "~/components/crud/Update";

import styles from "~/styles/components/form.module.scss";
import HeadingTitle from "~/components/headingTitle/HeadingTitle";

function RoleUpdate() {
  const form = "update";
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const { auth } = useAuth();
  const modifyBy = auth?.user?.username;
  const navigate = useNavigate();

  // Get current info
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/role/${id}`,
      headers,
    }).then((result) => {
      setRoleName(result.data.data.roleName);
      setDescription(result.data.data.description);
    });
  }, [id]);

  // Handle update role
  const handleUpdateRole = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: `http://localhost:8080/role/edit/${id}`,
      headers,
      data: JSON.stringify({ roleName, description, modifyBy }),
    }).then((result) => (result ? navigate("../view") : null));
  };

  return (
    <Update>
      {roleName ? (
        <form onSubmit={handleUpdateRole} className="form-group">
          <HeadingTitle title={"role"} form={form} />
          <div className={styles["form-body"]}>
            <div className="d-flex">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                className="form-control"
                defaultValue={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="Accountant Leader"
              />
            </div>
            <div className="d-flex">
              <label htmlFor="department">Description</label>
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

export default RoleUpdate;
