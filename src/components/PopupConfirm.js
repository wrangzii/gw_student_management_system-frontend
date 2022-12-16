import React from "react";

function PopupConfirm({ message, onPopup }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      onClick={() => onPopup(false)}
    >
      <div
        className="col-10 col-sm-6 col-md-4 col-lg-3"
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          borderRadius: "10px",
          backgroundColor: "#EEE",
        }}
      >
        <h3
          className="text-light bg-danger p-3 text-center w-100"
          style={{ borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}
        >
          {message}
        </h3>
        <div className="d-flex gap-3 p-3">
          <button onClick={() => onPopup(false)} className="btn btn-success">
            No
          </button>
          <button onClick={() => onPopup(true)} className="btn btn-danger">
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupConfirm;
