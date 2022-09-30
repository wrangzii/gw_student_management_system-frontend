import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { HandlerBtns, Loading, UserExecuted } from "~/components";
import { useAuth } from "~/store/auth";
import Update from "~/components/crud/Update";
import HeadingTitle from "~/components/headingTitle/HeadingTitle";
import httpRequest from "~/utils/httpRequest";

import styles from "~/styles/components/form.module.scss";

function TermUpdate() {
  const { auth } = useAuth();
  const { id } = useParams();
  const form = "update";
  const [data, setData] = useState({
    termName: "",
    termCode: "",
    description: "",
    modifyBy: auth?.user?.username,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  // Get current info
  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`term/filter?pageNumber=0&search=termCode:*${id}`)
      .then((result) => {
        const data = result?.data?.data[0];
        setData({
          termName: data.termName,
          termCode: data.termCode,
          description: data.description,
        });
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  }, [id]);

  // handle change value
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // Handle update term
  const handleUpdateTerm = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    httpRequest
      .put(`term/edit/${id}`, data)
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
                defaultValue={data.termName}
                onChange={handleChange}
                placeholder="Spring 2022"
                name="termName"
              />
            </div>
            <div className="d-flex">
              <label htmlFor="term">Term Code</label>
              <input
                type="text"
                className="form-control"
                defaultValue={data.termCode}
                // onChange={handleChange}
                placeholder="SPR22"
                name="termCode"
                readOnly
              />
            </div>
            <div className="d-flex">
              <label htmlFor="description">Description</label>
              <textarea
                cols="30"
                rows="2"
                className="form-control"
                defaultValue={data.description}
                onChange={handleChange}
                name="description"
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
