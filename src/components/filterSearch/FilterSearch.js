import "./index.scss";

function FilterSearch({
  onInputSearch,
  onSubmitSearch,
  onResetFilter,
  majorIdList = [],
}) {
  const factors = [
    {
      label: "Full Name",
      value: "fullName",
      type: "text",
    },
    {
      label: "FPT ID",
      value: "fptId",
      type: "text",
    },
    {
      label: "UOG ID",
      value: "uogId",
      type: "text",
    },
    {
      label: "Person ID",
      value: "personId",
      type: "text",
    },
    {
      label: "Email",
      value: "email",
      type: "email",
    },
  ];
  return (
    <form className="filter-search" name="search" onSubmit={onSubmitSearch}>
      <ul>
        <div className="major form-group">
          <label htmlFor="majorId">Major</label>
          <select
            className="form-select"
            onChange={onInputSearch}
            name="majorId"
          >
            <option value="">--Select--</option>
            {majorIdList.map((majorId, index) => (
              <option key={index} value={majorId.majorId}>
                {majorId.majorCode}
              </option>
            ))}
          </select>
        </div>
        {factors?.map((factor, index) => (
          <li key={index}>
            <label>{factor.label}</label>
            <input
              type={factor.type}
              className="form-control"
              onChange={onInputSearch}
              placeholder={`Search ${factor.label} here...`}
              name={factor.value}
            />
          </li>
        ))}
        <li>
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            id="gender"
            className="form-select"
            onChange={onInputSearch}
          >
            <option value="">Default</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </li>
        <li className="d-flex justify-content-end gap-3 mt-3 align-self-center">
          <button
            type="button"
            className="btn btn-danger"
            onClick={onResetFilter}
          >
            Reset
          </button>
          <button className="btn btn-warning">Search</button>
        </li>
      </ul>
    </form>
  );
}

export default FilterSearch;
