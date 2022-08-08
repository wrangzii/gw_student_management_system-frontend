import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { headers } from "~/utils/headersToken";
import { HandlerBtns, ErrorHandler, CreatedBy } from "~/components/partials";
import { useAuth } from "~/store/auth";

function Create() {
  const [className, setClassName] = useState("");
  const [classCode, setClassCode] = useState("");
  const [description, setDescription] = useState("");
  const [isError, setIsError] = useState(false);
  const { auth } = useAuth();
  const createBy = auth.username;
  const navigate = useNavigate();
  
  // Handle create class
  const handleCreateClass = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:8080/class/add",
      headers,
      data: JSON.stringify({ className, description, createBy }),
    })
      .then((result) => (result ? navigate("../view") : null))
      .catch((error) => {
        if (error.response.status === 400) {
          setIsError(true);
        }
      });
  };

  return (
    <div className="class-create">
      <form onSubmit={handleCreateClass} className="form-group">
        <h2 className="form-heading bg-success text-white text-center">
          CREATING A NEW CLASS
        </h2>
        <div className="form-body">
          {isError ? (
            <ErrorHandler name={className} msg={"is already taken!"} />
          ) : null}
          <div className="class-dropdown dropdown d-flex">
            <label htmlFor="class">Class</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                setClassName(e.target.value);
                setIsError(false);
              }}
              placeholder="Advanced Programming"
            />
          </div>
          <div className="class-dropdown dropdown d-flex">
            <label htmlFor="classCode">Class Code</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                setClassCode(e.target.value);
              }}
              placeholder="TCS1907"
            />
          </div>
          <div className="class-dropdown dropdown d-flex">
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
