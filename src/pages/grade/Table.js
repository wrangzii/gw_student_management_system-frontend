import React from "react";

function Table({ children }) {
  return (
    <table className="table table-striped table-hover table-bordered">
      {children}
    </table>
  );
}

export default Table;
