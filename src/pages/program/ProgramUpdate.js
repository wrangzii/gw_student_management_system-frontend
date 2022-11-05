import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { HandlerBtns, Loading, UserExecuted } from "~/components";
import { useAuth } from "~/store/auth";
import Update from "~/components/crud/Update";
import HeadingTitle from "~/components/headingTitle/HeadingTitle";
import httpRequest from "~/utils/httpRequest";

import styles from "~/styles/components/form.module.scss";
import { toast } from "react-toastify";

function ProgramUpdate() {
  const form = "update";
  const navigate = useNavigate();
  const [programName, setProgramName] = useState("");
  const [programCode, setProgramCode] = useState("");
  const [description, setDescription] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const { auth } = useAuth();
  const modifyBy = auth?.user?.username;
  const { id } = useParams();

  // Get current info
  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`program/${id}`)
      .then((result) => {
        const data = result?.data?.data;
        setProgramName(data.programName);
        setProgramCode(data.description);
        setDescription(data.description);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  }, [id]);

  // Handle update program
  const handleUpdateProgram = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    httpRequest
      .put(`program/edit/${id}`, {
        programName,
        description,
        programCode,
        modifyBy,
      })
      .then((result) => {
        result && toast.success(result.data.message);
        // result && navigate("../view");
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
        <form onSubmit={handleUpdateProgram} className="form-group">
          <HeadingTitle title={"program"} form={form} />
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

export default ProgramUpdate;
