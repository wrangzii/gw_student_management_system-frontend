import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import { headers, Cookies } from "~/utils/headersToken";
import { HandlerBtns, Loading, ModifiedBy } from "~/components/partials";
import { useAuth } from "~/store/auth";
import Update from "~/components/partials/crud/Update";
import HeadingTitle from "~/components/partials/headingTitle/HeadingTitle";

import styles from "~/styles/components/form.module.scss";

function ProgramUpdate() {
  const navigate = useNavigate();
  const [programName, setProgramName] = useState("");
  const [programCode, setProgramCode] = useState("");
  const [description, setDescription] = useState("");
  const { auth } = useAuth();
  const modifyBy = auth.username;
  const { id } = useParams();

  // Get current info
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/program/${id}`,
      headers,
    }).then((result) => {
      const data = result?.data?.data;
      setProgramName(data.programName);
      setProgramCode(data.description);
      setDescription(data.description);
    });
  }, [id]);

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
    <Update>
      {programName ? (
        <form onSubmit={handleUpdateProgram} className="form-group">
          <HeadingTitle title={"program"} form={"update"} />
          <div className={styles["form-body"]}>
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
    </Update>
  );
}

export default ProgramUpdate;
