import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { headers, cookies } from "../../headersToken";
import ActionBtns from "../../partials/ActionBtns";

function Update() {
  const { id } = useParams();
  const [fptId, setFptId] = useState("");
  const [personId, setPersonId] = useState("");
  const [uogId, setUogId] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const modifyBy = cookies.get("username");
  const navigate = useNavigate();

  // Get current info
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/student/${id}`,
      headers,
    }).then((result) => {
      setFptId(result.data.data.fptId);
      setPersonId(result.data.data.personId);
      setUogId(result.data.data.uogId);
      setFullName(result.data.data.fullName);
      setDob(result.data.data.dob);
      setGender(result.data.data.gender);
      setEmail(result.data.data.email);
    });
  }, []);

  // Handle update student
  const handleUpdateStudent = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: `http://localhost:8080/student/edit/${id}`,
      headers,
      data: JSON.stringify({
        fptId,
        personId,
        uogId,
        fullName,
        dob,
        gender,
        modifyBy,
        email,
      }),
    }).then((result) => (result ? navigate("../view") : null));
  };

  return (
    <div className="student-update">
      <form onSubmit={handleUpdateStudent} className="form-group">
        <h2 className="form-heading bg-warning text-white text-center">
          UPDATING A NEW STUDENT
        </h2>
        <div className="form-body">
          <div className="form-body__left">
            <div className="fullname form-group d-flex">
              <label htmlFor="fullname">Fullname</label>
              <input
                defaultValue={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                placeholder="Nguyen Van A"
                className="form-control"
              />
            </div>
            <div className="email form-group d-flex">
              <label htmlFor="email">Email</label>
              <input
                defaultValue={email}
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
                    defaultValue={"Male" || gender}
                    onChange={(e) => setGender(e.target.value)}
                    type="radio"
                    id="male"
                    className="ms-1"
                    name="gender"
                    checked={gender === "Male" ? true : false}
                  />
                </label>
                <label htmlFor="female">
                  Female
                  <input
                    defaultValue={"Female" || gender}
                    onChange={(e) => setGender(e.target.value)}
                    type="radio"
                    id="female"
                    className="ms-1"
                    name="gender"
                    checked={gender === "Female" ? true : false}
                  />
                </label>
              </div>
            </div>
            <div className="birthday form-group d-flex">
              <label htmlFor="birthday">Birthday</label>
              <input
                defaultValue={dob.replace(" 00:00:00.0", "")}
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
                defaultValue={fptId}
                onChange={(e) => setFptId(e.target.value)}
                type="text"
                className="form-control"
                placeholder="GCS190795"
              />
            </div>
            <div className="d-flex">
              <label htmlFor="person_id">Person ID</label>
              <input
                defaultValue={personId}
                onChange={(e) => setPersonId(e.target.value)}
                type="text"
                className="form-control"
                placeholder="KHANHTQ190795"
              />
            </div>
            <div className="d-flex">
              <label htmlFor="uog_id">UOG ID</label>
              <input
                defaultValue={uogId}
                onChange={(e) => setUogId(e.target.value)}
                type="text"
                className="form-control"
                placeholder="UOG190795"
              />
            </div>
            <div className="d-flex">
              <label htmlFor="createby">Created By</label>
              <input
                type="text"
                readOnly
                className="form-control"
                value={modifyBy}
              />
            </div>
            <ActionBtns action={"Update"} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Update;
