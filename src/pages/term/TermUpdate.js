import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { HandlerBtns, Loading, UserExecuted } from "~/components";
import { useAuth } from "~/store/auth";
import Update from "~/components/crud/Update";
import HeadingTitle from "~/components/headingTitle/HeadingTitle";
import httpRequest from "~/utils/httpRequest";

import styles from "~/styles/components/form.module.scss";

function TermUpdate() {
  const form = "update";
  const [termName, setTermName] = useState("");
  const [termCode, setTermCode] = useState("");
  const [description, setDescription] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();
  const { auth } = useAuth();
  const modifyBy = auth?.user?.username;
  const navigate = useNavigate();

  // Get current info
  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`term/${id}`)
      .then((result) => {
        const data = result?.data?.data;
        setTermName(data?.termName);
        setTermCode(data?.termCode);
        setDescription(data?.description);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  }, [id]);

  // Handle update term
  const handleUpdateTerm = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    httpRequest
      .put(`term/edit/${id}`, { termName, termCode, description, modifyBy })
      .then((result) => {
        result && navigate("../view");
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  };
  return (
    <Update>
      {isLoaded ? (
        <form onSubmit={handleUpdateTerm} className="form-group">
          <HeadingTitle title={"term"} form={form} />
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
            <UserExecuted type={form} />
            <HandlerBtns action={form} />
          </div>
        </form>
      ) : (
        <Loading />
      )}
    </Update>
  );
}

export default TermUpdate;
