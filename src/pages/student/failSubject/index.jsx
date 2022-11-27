import { useState, useEffect } from "react";
import httpRequest from "~/utils/httpRequest";

function FailSubject() {
  const [data, setData] = useState([]);
  useEffect(() => {
    httpRequest
      .get(`student/get/getFailSubjectList`)
      .then((result) => {
        setData(result?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="overflow-auto">
      <h4 className="text-info">Fail Subjects</h4>
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>Fullname</th>
            <th>FPT ID</th>
            <th>Major</th>
            <th>Program</th>
            <th>Term</th>
            <th>Subject</th>
            <th>Mark</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((student, index) => (
            <tr key={index}>
              <td>{student.fullName}</td>
              <td>{student.fptId}</td>
              <td>{student.majorName}</td>
              <td>{student.programName}</td>
              <td>{student.termCode}</td>
              <td>{student.subjectCode}</td>
              <td>{student.mark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FailSubject;
