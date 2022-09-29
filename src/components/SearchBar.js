function SearchBar({ page, onInputSearch, onSubmitSearch }) {
  return (
    <form className="search d-flex col-12 mb-3" onSubmit={onSubmitSearch}>
      <div className="search-bar">
        <input
          type="search"
          className="form-control mb-0 h-100"
          placeholder={`Search ${page} here...`}
          onChange={onInputSearch}
        />
      </div>
      <button className="btn search-btn btn-warning">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
}

export default SearchBar;
