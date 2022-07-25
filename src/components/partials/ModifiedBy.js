import React from "react";
import { username } from "../headersToken";

function ModifiedBy() {
  const modifyBy = username;
  return (
    <div className="modifyBy form-group d-flex">
      <label htmlFor="modifyBy">Modified By</label>
      <input
        type="text"
        readOnly
        defaultValue={modifyBy}
        className="form-control"
      />
    </div>
  );
}

export default ModifiedBy;
