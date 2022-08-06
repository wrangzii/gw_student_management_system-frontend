import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { headers } from "~/components/headersToken";
import { HandlerBtns, CreatedBy } from "~/components/partials";
import { useAuth } from "~/store/auth";

function Create() {
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const { auth } = useAuth();
  const createBy = auth.username;
  const navigate = useNavigate();

  // Handle create role
  const handleCreateRole = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:8080/role/add",
      headers,
      data: JSON.stringify({ roleName, description, createBy }),
    }).then((result) => (result ? navigate("../view") : null));
  };

  return (
    <div className="role-create">
      <form onSubmit={handleCreateRole} className="form-group">
        <h2 className="form-heading bg-success text-white text-center">
          CREATING A NEW ROLE
        </h2>
        <div className="form-body">
          <div className="d-flex">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="Accountant Leader"
            />
          </div>
          <div className="d-flex">
            <label htmlFor="description">Description</label>
            <textarea
              cols="30"
              rows="2"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <CreatedBy />
          <HandlerBtns action={"Create"} />
        </div>
      </form>
    </div>
  );
}

export default Create;
