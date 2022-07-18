import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { headers, cookies } from "../../headersToken";
import HandlerBtns from "../../partials/HandlerBtns";

function Create() {
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const createBy = cookies.get("username");
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
          <div className="d-flex">
            <label htmlFor="createdBy">Created By</label>
            <input
              type="text"
              className="form-control"
              readOnly
              value={createBy}
            />
          </div>
          <HandlerBtns action={"Create"} />
        </div>
      </form>
    </div>
  );
}

export default Create;
