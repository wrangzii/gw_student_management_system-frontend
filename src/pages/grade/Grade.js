import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import { SearchBar, Loading } from "~/components";
import { sections } from "./Sections";
import CollapseSection from "./CollapseSection";
import { headers } from "~/utils/headersToken";

import styles from "./grade.module.scss";

function Grade() {
  const [studentInfo, setStudentInfo] = useState({});
  const [status, setStatus] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const studentId = useParams();

  // Get student's grade (score)
  useEffect(() => {
    setIsLoaded(false);
    axios({
      method: "get",
      url: `http://localhost:8080/student/get/score/${studentId.id}`,
      headers,
    }).then((result) => {
      const data = result?.data?.data;
      const studentSubjectId = data.studentSubjectId;
      setStudentInfo(studentSubjectId.studentId);
      setStatus(data.status);
      setIsLoaded(true);
    });
  }, []);

  return (
    <div className={styles["grade"]}>
      <SearchBar page={"student name or FPT ID"} />
      {isLoaded ? (
        <div className="card mb-3 col-12 col-md-6">
          <div className="card-body">
            <h3 className="card-title">{studentInfo.fullName}</h3>
            <p className="card-text">Status: {status}</p>
            <p className="card-text">FPT ID: {studentInfo.fptId}</p>
            <p className="card-text">Pearson ID: {studentInfo.personId}</p>
            <p className="card-text">UOG ID: {studentInfo.uogId}</p>
          </div>
        </div>
      ) : (
        <Loading />
      )}
      {sections.map((section) => (
        <CollapseSection
          key={section.id}
          title={section.title}
          color={section.color}
        />
      ))}
    </div>
  );
}

export default Grade;
