import React from "react";

function Message({ isSuccess, msg, onCloseMsg }) {
  return (
    <div className="message position-relative" role="alert">
      <p className={`alert alert-${isSuccess ? "success" : "danger"}`}>{msg}</p>
      <span className="close-msg" onClick={onCloseMsg}>
        &times;
      </span>
    </div>
  );
}

export default Message;
