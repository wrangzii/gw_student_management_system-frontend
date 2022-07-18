import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { headers, cookies } from "../../headersToken";
import HandlerBtns from "../../partials/HandlerBtns";
import Loading from "../../partials/Loading/Loading";

function Update() {
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const modifyBy = cookies.get("username");
  const { id } = useParams();
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
  }, []);

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
    <div className="role-update">
      {roleName ? (
        <form onSubmit={handleUpdateRole} className="form-group">
          <h2 className="form-heading bg-warning text-white text-center">
            UPDATING ROLE
          </h2>
          <div className="form-body">
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
            <div className="d-flex">
              <label htmlFor="createdBy">Modified By</label>
              <input
                type="text"
                className="form-control"
                readOnly
                value={modifyBy}
              />
            </div>
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
