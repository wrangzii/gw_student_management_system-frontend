import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "~/components";
import ViewDetail from "~/components/crud/ViewDetail";
import httpRequest from "~/utils/httpRequest";

function ViewGrade() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [grades, setGrades] = useState([
    {
      fptId: "",
      fullName: "",
      ename: "",
      subjectName: "",
      subjectCode: "",
      status: "",
      mark: "",
      attendancePercent: "",
    },
  ]);
  const id = useParams();

  useEffect(() => {
    setIsLoaded(false);
    httpRequest
      .get(`student/get/score/${id.id}`)
      .then((result) => {
        const data = result?.data?.data;
        const grade = data.map((d) => {
          return {
            fptId: d.studentSubjectId.fptId.fptId,
            fullName: d.studentSubjectId.fptId.fullName,
            ename: d.studentSubjectId.fptId.majorId.ename,
            subjectCode: d.studentSubjectId.subjectCode.subjectCode,
            subjectName: d.studentSubjectId.subjectCode.subjectName,
            status: d.status,
            mark: d.mark,
            attendancePercent: d.attendancePercent,
          };
        });
        setGrades(grade);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      });
  }, []);

  console.log(grades);

  return (
    <ViewDetail>
      {isLoaded ? (
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>FPT ID</th>
              <th>Full Name</th>
              <th>E_Name</th>
              <th>Subject Code</th>
              <th>Subject Name</th>
              <th>Status</th>
              <th>Grade</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade, index) => (
              <tr key={index}>
                <td>{grade.fptId}</td>
                <td>{grade.fullName}</td>
                <td>{grade.ename}</td>
                <td>{grade.subjectCode}</td>
                <td>{grade.subjectName}</td>
                <td>{grade.status}</td>
                <td>{grade.mark}</td>
                <td>{grade.attendancePercent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Loading />
      )}
    </ViewDetail>
  );
}

export default ViewGrade;
