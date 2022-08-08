import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import { headers } from "~/utils/headersToken";
import { HandlerBtns, Loading, ModifiedBy } from "~/components/partials";
import { useAuth } from "~/store/auth";
import Update from "~/components/partials/crud/Update";
import HeadingTitle from "~/components/partials/headingTitle/HeadingTitle";

import styles from "~/styles/components/form.module.scss";

function TermUpdate() {
  const [termName, setTermName] = useState("");
  const [termCode, setTermCode] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const { auth } = useAuth();
  const modifyBy = auth.username;
  const navigate = useNavigate();

  // Get current info
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/term/${id}`,
      headers,
    }).then((result) => {
      const data = result?.data?.data;
      setTermName(data.termName);
      setTermCode(data.termCode);
      setDescription(data.description);
    });
  }, [id]);

  // Handle update term
  const handleUpdateTerm = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: `http://localhost:8080/term/edit/${id}`,
      headers,
      data: JSON.stringify({ termName, termCode, description, modifyBy }),
    }).then((result) => (result ? navigate("../view") : null));
  };
  return (
    <Update>
      {termName ? (
        <form onSubmit={handleUpdateTerm} className="form-group">
          <HeadingTitle title={"term"} form={"update"} />
          <div className={styles["form-body"]}>
            <div className="d-flex">
              <label htmlFor="term">Term</label>
              <input
                type="text"
                className="form-control"
                defaultValue={termName}
                onChange={(e) => setTermName(e.target.value)}
                placeholder="Spring 2022"
              />
            </div>
            <div className="d-flex">
              <label htmlFor="term">Term Code</label>
              <input
                type="text"
                className="form-control"
                defaultValue={termCode}
                onChange={(e) => setTermCode(e.target.value)}
                placeholder="SPR22"
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
    </Update>
  );
}

export default TermUpdate;
