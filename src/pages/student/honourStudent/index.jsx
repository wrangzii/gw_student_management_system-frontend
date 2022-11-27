import { useState, useEffect } from "react";
import httpRequest from "~/utils/httpRequest";

function HonourStudent() {
  const [data, setData] = useState([]);
  useEffect(() => {
    httpRequest
      .get(`student/get/honorList/2/SP22/2`)
      .then((result) => {
        setData(result?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="overflow-auto">
      <h4 className="text-info">Honour Students</h4>
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>Fullname</th>
            <th>FPT ID</th>
            <th>Major</th>
            <th>Term</th>
            <th>Subject</th>
            <th>Studied</th>
            <th>Mark</th>
            <th>Avg Score</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((student, index) => (
            <tr key={index}>
              <td>{student.fullName}</td>
              <td>{student.fptId}</td>
              <td>{student.majorName}</td>
              <td>{student.termCode}</td>
              <td>{student.subjectCode}</td>
              <td>{student.numberSubjectStudiedInTheTerm}</td>
              <td>{student.mark}</td>
              <td>{Math.round(student.averageScore * 10) / 10}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HonourStudent;
