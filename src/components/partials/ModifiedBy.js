import React from "react";
import { useAuth } from "~/store/auth";

function ModifiedBy() {
  const { auth } = useAuth();
  return (
    <div className="modifyBy form-group d-flex">
      <label htmlFor="modifyBy">Modified By</label>
      <input
        type="text"
        readOnly
        defaultValue={auth.username}
        className="form-control"
      />
    </div>
  );
}

export default ModifiedBy;
