import { useState, useEffect } from "react";
import httpRequest from "~/utils/httpRequest";

function OjtStudent() {
  const [data, setData] = useState([]);
  useEffect(() => {
    httpRequest
      .get(`student/get/studentJoinOJT`)
      .then((result) => {
        setData(result?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="overflow-auto">
      <h4 className="text-info">OJT Students</h4>
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>Fullname</th>
            <th>FPT ID</th>
            <th>Major</th>
            <th>Number of Term</th>
            <th>BTEC passed</th>
            <th>BTEC studied</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((student, index) => (
            <tr key={index}>
              <td>{student.fullName}</td>
              <td>{student.fptId}</td>
              <td>{student.majorName}</td>
              <td>{student.numberOfTerms}</td>
              <td>{student.btecPassed}</td>
              <td>{student.btecStudied}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OjtStudent;
