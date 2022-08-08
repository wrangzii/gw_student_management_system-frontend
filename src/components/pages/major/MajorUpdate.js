import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import { headers } from "~/utils/headersToken";
import { HandlerBtns, Loading, ModifiedBy } from "~/components/partials";
import { useAuth } from "~/store/auth";
import Update from "~/components/partials/crud/Update";
import HeadingTitle from "~/components/partials/headingTitle/HeadingTitle";

import styles from "~/styles/components/form.module.scss";

function MajorUpdate() {
  const [vName, setVName] = useState("");
  const [eName, setEName] = useState("");
  const [majorCode, setMajorCode] = useState("");
  const { id } = useParams();
  const { auth } = useAuth();
  const modifyBy = auth.username;
  const navigate = useNavigate();

  // Get current info
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/major/${id}`,
      headers,
    }).then((result) => {
      const data = result?.data?.data;
      setVName(data.vName);
      setEName(data.vName);
      setMajorCode(data.majorCode);
    });
  }, [id]);

  // Handle update major
  const handleUpdateMajor = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: `http://localhost:8080/major/edit/${id}`,
      headers,
      data: JSON.stringify({ vName, eName, majorCode, modifyBy }),
    }).then((result) => (result ? navigate("../view") : null));
  };
  return (
    <Update>
      {vName ? (
        <form onSubmit={handleUpdateMajor} className="form-group">
          <HeadingTitle title={"major"} form={"update"} />
          <div className={styles["form-body"]}>
            <div className="d-flex">
              <label htmlFor="major">V_Major Name</label>
              <input
                type="text"
                className="form-control"
                defaultValue={vName}
                onChange={(e) => setVName(e.target.value)}
                placeholder="Computer Science"
              />
            </div>
            <div className="d-flex">
              <label htmlFor="major">E_Major Name</label>
              <input
                type="text"
                className="form-control"
                defaultValue={vName}
                onChange={(e) => setEName(e.target.value)}
                placeholder="Front End Developer"
              />
            </div>
            <div className="d-flex">
              <label htmlFor="major">Major Code</label>
              <input
                type="text"
                className="form-control"
                defaultValue={majorCode}
                onChange={(e) => setMajorCode(e.target.value)}
                placeholder="FE_DEV22"
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

export default MajorUpdate;
