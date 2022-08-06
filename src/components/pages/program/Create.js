import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { headers } from "~/components/headersToken";
import { HandlerBtns, CreatedBy } from "~/components/partials";
import { useAuth } from "~/store/auth";

function Create() {
  const navigate = useNavigate();
  const [programName, setProgramName] = useState("");
  const [description, setDescription] = useState("");
  const { auth } = useAuth();
  const createBy = auth.username;

  // Handle create program
  const handleCreateProgam = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:8080/program/add",
      headers,
      data: JSON.stringify({ programName, description, createBy }),
    }).then((result) => (result ? navigate("../view") : null));
  };
  return (
    <div className="program-create">
      <form onSubmit={handleCreateProgam} className="form-group">
        <h2 className="form-heading bg-success text-white text-center">
          CREATING A NEW PROGRAM
        </h2>
        <div className="form-body">
          <div className="program-name d-flex">
            <label htmlFor="program_name">Program Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="BTEC"
              onChange={(e) => setProgramName(e.target.value)}
            />
          </div>
          <div className="description d-flex">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              placeholder="About this program"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <CreatedBy />
          <HandlerBtns action={"Create"} />
        </div>
      </form>
    </div>
  );
}

export default Create;
