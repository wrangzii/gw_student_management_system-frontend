import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import httpRequest from "~/utils/httpRequest";

function AddStudent() {
  const { id } = useParams();
  const fptId = useState("");
  const [clsList, setClsList] = useState([]);
  const handleChange = () => {
    httpRequest
      .post(`studentClass/add`, { fptId })
      .then((result) => console.log(result));
  };

  useEffect(() => {
    httpRequest.get(`studentClass/all?pageNumber=0`).then((result) => {
      setClsList(result?.data);
    });
  }, []);

  return (
    <>
      <h6>Class: {id}</h6>
      <form>
        <div className="form-group">
          <label htmlFor="classCode">FPT ID</label>
          <Select
            isMulti
            name="colors"
            options={[{ label: clsList, value: clsList }]}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Fullname">Fullname</label>
          <input
            type="password"
            className="form-control"
            id="fullName"
            placeholder="Fullname"
            readOnly
          />
        </div>
      </form>
    </>
  );
}

export default AddStudent;
