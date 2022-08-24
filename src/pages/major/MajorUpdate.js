import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { HandlerBtns, Loading, UserExecuted } from "~/components";
import { useAuth } from "~/store/auth";
import Update from "~/components/crud/Update";
import HeadingTitle from "~/components/headingTitle/HeadingTitle";
import httpRequest from "~/utils/httpRequest";

import styles from "~/styles/components/form.module.scss";

function MajorUpdate() {
  const form = "update";
  const [vname, setVname] = useState("");
  const [vietnameseName, setVietnameseName] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [ename, setEname] = useState("");
  const [majorCode, setMajorCode] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();
  const { auth } = useAuth();
  const modifyBy = auth?.user?.username;
  const navigate = useNavigate();

  // Get current info
  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`major/${id}`)
      .then((result) => {
        const data = result?.data?.data;
        setVname(data.vname);
        setEname(data.ename);
        setMajorCode(data.majorCode);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  }, [id]);

  // Handle update major
  const handleUpdateMajor = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    httpRequest
      .put(`major/edit/${id}`, {
        vietnameseName,
        englishName,
        majorCode,
        modifyBy,
      })
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
        <form onSubmit={handleUpdateMajor} className="form-group">
          <HeadingTitle title={"major"} form={form} />
          <div className={styles["form-body"]}>
            <div className="d-flex">
              <label htmlFor="major">V_Major Name</label>
              <input
                type="text"
                className="form-control"
                defaultValue={vname}
                onChange={(e) => setVietnameseName(e.target.value)}
                placeholder="Computer Science"
              />
            </div>
            <div className="d-flex">
              <label htmlFor="major">E_Major Name</label>
              <input
                type="text"
                className="form-control"
                defaultValue={ename}
                onChange={(e) => setEnglishName(e.target.value)}
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

export default MajorUpdate;
