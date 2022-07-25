import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { headers, Cookies } from "../../headersToken";
import HandlerBtns from "../../partials/HandlerBtns";
import CreatedBy from "../../partials/CreatedBy";

function Create() {
  const createBy = Cookies.get("username");
  const [fptId, setFptId] = useState("");
  const [personId, setPersonId] = useState("");
  const [uogId, setUogId] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Handle create student
  const handleCreateStudent = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:8080/student/add",
      headers,
      data: JSON.stringify({
        fptId,
        personId,
        uogId,
        fullName,
        dob,
        gender,
        createBy,
        email,
      }),
    }).then((result) => (result ? navigate("../view") : null));
  };
  
  return (
    <div className="student-create">
      <form onSubmit={handleCreateStudent} className="form-group">
        <h2 className="form-heading bg-success text-white text-center">
          CREATING A NEW STUDENT
        </h2>
        <div className="form-body">
          <div className="form-body__left">
            <div className="fullname form-group d-flex">
              <label htmlFor="fullname">Fullname</label>
              <input
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                placeholder="Nguyen Van A"
                className="form-control"
              />
            </div>
            <div className="email form-group d-flex">
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="nguyenvana@fe.edu.vn"
                className="form-control"
              />
            </div>
            <div className="gender-dropdown dropdown d-flex">
              <label htmlFor="gender">Gender</label>
              <div className="d-flex mb-4">
                <label htmlFor="male">
                  Male
                  <input
                    onChange={(e) => setGender(e.target.value)}
                    type="radio"
                    id="male"
                    className="ms-1"
                    name="gender"
                    defaultValue={"Male"}
                  />
                </label>
                <label htmlFor="female">
                  Female
                  <input
                    onChange={(e) => setGender(e.target.value)}
                    type="radio"
                    id="female"
                    className="ms-1"
                    name="gender"
                    defaultValue={"Female"}
                  />
                </label>
              </div>
            </div>
            <div className="birthday form-group d-flex">
              <label htmlFor="birthday">Birthday</label>
              <input
                onChange={(e) => setDob(e.target.value)}
                type="date"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-body__right">
            <div className="d-flex">
              <label htmlFor="fpt_id">FPT ID</label>
              <input
                onChange={(e) => setFptId(e.target.value)}
                type="text"
                className="form-control"
                placeholder="GCS190795"
              />
            </div>
            <div className="d-flex">
              <label htmlFor="person_id">Person ID</label>
              <input
                onChange={(e) => setPersonId(e.target.value)}
                type="text"
                className="form-control"
                placeholder="KHANHTQ190795"
              />
            </div>
            <div className="d-flex">
              <label htmlFor="uog_id">UOG ID</label>
              <input
                onChange={(e) => setUogId(e.target.value)}
                type="text"
                className="form-control"
                placeholder="UOG190795"
              />
            </div>
            <CreatedBy />
            <HandlerBtns action={"Create"} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Create;
