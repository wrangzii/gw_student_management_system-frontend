import React from "react";
import { useAuth } from "~/store/auth";

function UserExecuted({ type }) {
  const { auth } = useAuth();
  return (
    <div className="d-flex">
      <label htmlFor={type === "create" ? "createdBy" : "modifiedBy"}>
        {type === "create" ? "Created By" : "Modified By"}
      </label>
      <input
        type="text"
        className="form-control"
        readOnly
        value={auth?.user?.username}
      />
    </div>
  );
}

export default UserExecuted;
