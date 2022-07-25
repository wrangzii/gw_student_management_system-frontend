import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { headers, username } from "../../headersToken";
import HandlerBtns from "../../partials/HandlerBtns";
import Loading from "../../partials/Loading/Loading";
import ModifiedBy from "../../partials/ModifiedBy";

function Update() {
  const [departmentName, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");
  const modifyBy = username;
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
      headers,
      data: JSON.stringify({ departmentName, description, modifyBy }),
    }).then((result) => (result ? navigate("../view") : null));
  };
  return (
    <div className="department-update">
      {departmentName ? (
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
            <ModifiedBy />
            <HandlerBtns action={"Update"} />
          </div>
        </form>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Update;
