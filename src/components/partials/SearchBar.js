import React from "react";

function SearchBar({ page }) {
  return (
    <div className="search d-flex col-6 mb-3">
      <div className="search-bar">
        <input
          type="search"
          className="form-control mb-0 h-100"
          placeholder={`Search ${page} here...`}
        />
      </div>
      <button className="btn search-btn btn-warning">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  );
}

export default SearchBar;
