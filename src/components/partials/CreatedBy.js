import React from "react";
import { username } from "../headersToken";

function CreatedBy() {
  const createBy = username;
  return (
    <div className="d-flex">
      <label htmlFor="createdBy">Created By</label>
      <input type="text" className="form-control" readOnly value={createBy} />
    </div>
  );
}

export default CreatedBy;
