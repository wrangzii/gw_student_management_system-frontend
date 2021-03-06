import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { headers, Cookies } from "../../headersToken";
import HandlerBtns from "../../partials/HandlerBtns";
import Loading from "../../partials/Loading/Loading";
import ModifiedBy from "../../partials/ModifiedBy";

function Update() {
  const navigate = useNavigate();
  const [programName, setProgramName] = useState("");
  const [programCode, setProgramCode] = useState("");
  const [description, setDescription] = useState("");
  const modifyBy = Cookies.get("username");
  const { id } = useParams();

  // Get current info
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/program/${id}`,
      headers,
    }).then((result) => {
      setProgramName(result.data.data.programName);
      setProgramCode(result.data.data.description);
      setDescription(result.data.data.description);
    });
  }, []);

  // Handle update program
  const handleUpdateProgram = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: `http://localhost:8080/program/edit/${id}`,
      headers: {
        Authorization: "Bearer " + Cookies.get("token"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ programName, description, programCode, modifyBy }),
    }).then((result) => (result ? navigate("../view") : null));
  };
  return (
    <div className="program-update">
      {programName ? (
        <form onSubmit={handleUpdateProgram} className="form-group">
          <h2 className="form-heading bg-warning text-white text-center">
            UPDATING PROGRAM
          </h2>
          <div className="form-body">
            <div className="program-name d-flex">
              <label htmlFor="programName">Program Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="BTEC"
                defaultValue={programName}
                onChange={(e) => setProgramName(e.target.value)}
              />
            </div>
            <div className="description d-flex">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                placeholder="About this program"
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
              />
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
