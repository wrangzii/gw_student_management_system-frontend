import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { HandlerBtns, Loading, UserExecuted } from "~/components";
import { useAuth } from "~/store/auth";
import Update from "~/components/crud/Update";
import HeadingTitle from "~/components/headingTitle/HeadingTitle";
import httpRequest from "~/utils/httpRequest";

import styles from "~/styles/components/form.module.scss";
import { toast } from "react-toastify";

function RoleUpdate() {
  const form = "update";
  const [roleName, setRoleName] = useState("");
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
      .get(`role/${id}`)
      .then((result) => {
        const data = result?.data?.data;
        setRoleName(data.roleName.slice(5));
        setDescription(data.description);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  }, [id]);

  // Handle update role
  const handleUpdateRole = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    httpRequest
      .put(`role/edit/${id}`, {
        roleName,
        description,
        modifyBy,
      })
      .then((result) => {
        result && toast.success(result.data.message);
        // result && navigate("../view");
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
