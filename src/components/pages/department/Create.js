import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { headers, cookies } from "../../headersToken";
import ActionBtns from "../../partials/ActionBtns";

function Create() {
  const [departmentName, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");
  const createBy = cookies.get("username");
  const navigate = useNavigate();

  // Handle create department
  const handleCreateDepartment = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:8080/department/add",
      headers,
      data: JSON.stringify({ departmentName, description, createBy }),
    }).then((result) => (result ? navigate("../view") : null));
  };

  return (
    <div className="department-create">
      <form onSubmit={handleCreateDepartment} className="form-group">
        <h2 className="form-heading bg-success text-white text-center">
          CREATING A NEW DEPARTMENT
        </h2>
        <div className="form-body">
          <div className="department-dropdown dropdown d-flex">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setDepartmentName(e.target.value)}
              placeholder="Assurance"
            />
          </div>
          <div className="department-dropdown dropdown d-flex">
            <label htmlFor="department">Description</label>
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
              value={cookies.get("username")}
            />
          </div>
          <ActionBtns action={"Create"} />
        </div>
      </form>
    </div>
  );
}

export default Create;
