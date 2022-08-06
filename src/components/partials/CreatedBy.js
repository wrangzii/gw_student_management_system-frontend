import React from "react";
import { useAuth } from "~/store/auth";

function CreatedBy() {
  const { auth } = useAuth();
  return (
    <div className="d-flex">
      <label htmlFor="createdBy">Created By</label>
      <input type="text" className="form-control" readOnly value={auth.username} />
    </div>
  );
}

export default CreatedBy;
