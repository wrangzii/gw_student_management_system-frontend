import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import { headers } from "~/utils/headersToken";
import { HandlerBtns, Loading, UserExecuted } from "~/components";
import { useAuth } from "~/store/auth";
import Update from "~/components/crud/Update";
import HeadingTitle from "~/components/headingTitle/HeadingTitle";

import styles from "~/styles/components/form.module.scss";

function MajorUpdate() {
  const form = "update";
  const [vname, setVname] = useState("");
  const [vietnameseName, setVietnameseName] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [ename, setEname] = useState("");
  const [majorCode, setMajorCode] = useState("");
  const { id } = useParams();
  const { auth } = useAuth();
  const modifyBy = auth?.user?.username;
  const navigate = useNavigate();

  // Get current info
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/major/${id}`,
      headers,
    }).then((result) => {
      const data = result?.data?.data;
      setVname(data.vname);
      setEname(data.ename);
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
      data: JSON.stringify({
        vietnameseName,
        englishName,
        majorCode,
        modifyBy,
      }),
    }).then((result) => (result ? navigate("../view") : null));
  };

  return (
    <Update>
      {vname ? (
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
