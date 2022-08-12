import React from "react";

function Message({ isSuccess, msg }) {
  return (
    <div className="message" role="alert">
      <p className={`alert alert-${isSuccess ? "success" : "danger"}`}>{msg}</p>
    </div>
  );
}

export default Message;
