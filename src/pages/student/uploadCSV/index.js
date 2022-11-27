import { useCallback, useState } from "react";
import axios from "axios";

import { useAuth } from "~/store/auth";
import { Loading } from "~/components";
import { ToastContainer, toast } from "react-toastify";
import { saveAs } from "file-saver";

function UploadCSV() {
  const [csvFile, setCsvFile] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);
  const [formData, setFormData] = useState(new FormData());
  const { auth } = useAuth();

  // Handle import CSV file
  const onFileChange = (e) => {
    const file = e.target?.files[0];
    if (file) {
      formData.append("file", file);
      setCsvFile(file.name);
    }
  };

  // Handle submit file
  const handleSubmitFile = () => {
    setIsLoaded(false);
    axios({
      method: "post",
      url: "http://localhost:8080/student/insert/file",
      data: formData,
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((result) => {
        const blob = new Blob([result.data], {
          type: "text/csv; charset=UTF-8",
        });
        saveAs(blob, "Invalid_Students.csv");
        notify();
        setCsvFile("");
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        setCsvFile("");
        setIsLoaded(true);
      });
  };

  // Toast
  const notify = useCallback(() => {
    toast.success("Import successfully!");
  }, [csvFile]);

  return (
    <>
      <ToastContainer autoClose={3000} />
      {isLoaded ? (
        <label className="import-file mb-2" htmlFor="file">
          <span className="btn btn-danger">
            <i className="fa-solid fa-upload p-0 me-2"></i>
            Upload Student
          </span>
          <input type="file" onChange={onFileChange} id="file" hidden />

          {csvFile && (
            <>
              <div className="d-flex flex-column align-items-start gap-2 mt-2">
                <p className="d-inline-block mb-0">
                  <b>File name:</b> {csvFile}
                </p>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleSubmitFile}
                >
                  <i className="fa-solid fa-circle-arrow-up p-0 me-2"></i>
                  Submit
                </button>
              </div>
            </>
          )}
        </label>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default UploadCSV;
