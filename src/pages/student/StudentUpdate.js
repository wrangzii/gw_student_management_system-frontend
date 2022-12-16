import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { HandlerBtns, Loading, UserExecuted } from "~/components";
import { useAuth } from "~/store/auth";
import Update from "~/components/crud/Update";
import HeadingTitle from "~/components/headingTitle/HeadingTitle";
import httpRequest from "~/utils/httpRequest";

import styles from "~/styles/components/form.module.scss";

function StudentUpdate() {
  const { auth } = useAuth();
  const form = "update";
  const [viewDetail, setViewDetail] = useState([]);
  const [data, setData] = useState({
    fptId: "",
    personId: "",
    uogId: "",
    fullName: "",
    dob: "",
    gender: "",
    email: "",
    modifyBy: auth?.user?.username,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // Get current info
  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`student/filter?pageNumber=0&search=fptId:*${id}`)
      .then((result) => {
        let data = result?.data?.data;
        setViewDetail(data);
        // setData({
        //   fptId: data.fptId,
        //   personId: data.personId,
        //   uogId: data.uogId,
        //   fullName: data.fullName,
        //   dob: data.dob,
        //   gender: data.gender,
        //   email: data.email,
        // });
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

  // Handle update student
  const handleUpdateStudent = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    httpRequest
      .put(`student/edit/${id}`, data)
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
        <form onSubmit={handleUpdateStudent} className="form-group">
          <HeadingTitle title={"student"} form={form} />
          {viewDetail.map((student, index) => (
            <div className={styles["form-body"]} key={index}>
              <div className="form-body__left">
                <div className="fullname form-group d-flex">
                  <label htmlFor="fullname">Fullname</label>
                  <input
                    defaultValue={student.fullName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Nguyen Van A"
                    className="form-control"
                    name="fullName"
                  />
                </div>
                <div className="email form-group d-flex">
                  <label htmlFor="email">Email</label>
                  <input
                    defaultValue={student.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="nguyenvana@fe.edu.vn"
                    className="form-control"
                    name="email"
                  />
                </div>
                <div className="gender-dropdown dropdown d-flex">
                  <label htmlFor="gender">Gender</label>
                  <div className="d-flex mb-4 flex-wrap">
                    <label htmlFor="male">
                      Male
                      <input
                        defaultValue="Male"
                        onChange={handleChange}
                        type="radio"
                        id="male"
                        className="ms-1"
                        name="gender"
                        checked={student.gender === "Male" ? true : false}
                      />
                    </label>
                    <label htmlFor="female">
                      Female
                      <input
                        defaultValue="Female"
                        onChange={handleChange}
                        type="radio"
                        id="female"
                        className="ms-1"
                        name="gender"
                        checked={student.gender === "Female" ? true : false}
                      />
                    </label>
                  </div>
                </div>
                <div className="birthday form-group d-flex">
                  <label htmlFor="birthday">Birthday</label>
                  <input
                    defaultValue={student.dob.replace(" 00:00:00.0", "")}
                    onChange={handleChange}
                    type="date"
                    className="form-control"
                    name="dob"
                  />
                </div>
              </div>
              <div className="form-body__right">
                <div className="d-flex">
                  <label htmlFor="fpt_id">FPT ID</label>
                  <input
                    defaultValue={student.fptId}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="GCS190795"
                    name="fptId"
                  />
                </div>
                <div className="d-flex">
                  <label htmlFor="person_id">Person ID</label>
                  <input
                    defaultValue={student.personId}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="KHANHTQ190795"
                    name="personId"
                  />
                </div>
                <div className="d-flex">
                  <label htmlFor="uog_id">UOG ID</label>
                  <input
                    defaultValue={student.uogId}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="UOG190795"
                    name="uogId"
                  />
                </div>
                <UserExecuted type={form} />
                <HandlerBtns action={form} />
              </div>
            </div>
          ))}
        </form>
      ) : (
        <Loading />
      )}
    </Update>
  );
}

export default StudentUpdate;
