import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { headers, cookies } from "../../headersToken";
import ActionBtns from "../../partials/ActionBtns";

function Update() {
  const [departmentName, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");
  const modifyBy = cookies.get("username");
  const { id } = useParams();
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
  }, []);

  // Handle update department
  const handleUpdateDepartment = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: `http://localhost:8080/department/edit/${id}`,
      headers: {
        Authorization: "Bearer " + cookies.get("token"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ departmentName, description, modifyBy }),
    }).then((result) => (result ? navigate("../view") : null));
  };
  return (
    <div className="department-update">
      <form onSubmit={handleUpdateDepartment} className="form-group">
        <h2 className="form-heading bg-warning text-white text-center">
          UPDATING DEPARTMENT
        </h2>
        <div className="form-body">
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
          <div className="d-flex">
            <label htmlFor="createdBy">Modified By</label>
            <input
              type="text"
              className="form-control"
              readOnly
              value={modifyBy}
            />
          </div>
          <ActionBtns action={"Update"} />
        </div>
      </form>
    </div>
  );
}

export default Update;
