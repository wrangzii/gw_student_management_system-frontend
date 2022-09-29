// import Dropdown from "./components/dropdown/Dropdown";

import "./index.scss";

function FilterSearch({ onInputSearch, onSubmitSearch, onResetFilter }) {
  // const [value, setValue] = useState({
  //   fullName: "",
  //   major: "",
  //   fptId: "",
  //   uogId: "",
  //   personId: "",
  //   gender: "",
  //   email: "",
  // });
  // const options = [
  //   {
  //     label: "Default",
  //     value: "default",
  //   },
  //   {
  //     label: "Contains",
  //     value: "contains",
  //   },
  //   {
  //     label: "Absolute",
  //     value: "absolute",
  //   },
  // ];

  const factors = [
    {
      label: "Full Name",
      value: "fullName",
      type: "text",
    },
    // {
    //   label: "Major",
    //   value: "major",
    //   type: "text",
    // },
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
    <form className="filter-search" onSubmit={onSubmitSearch}>
      <ul>
        {factors.map((factor, index) => (
          <li key={index}>
            <label>{factor.label}</label>
            <div className="field">
              {/* <Dropdown options={options} onHandleChange={handleChange} /> */}
              <input
                type={factor.type}
                className="form-control"
                onChange={onInputSearch}
                placeholder="Search here..."
                id={factor.value}
              />
            </div>
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
        <li className="d-flex justify-content-center gap-3">
          <button type="button" className="btn btn-danger" onClick={onResetFilter}>
            Reset
          </button>
          <button className="btn btn-warning">Search</button>
        </li>
      </ul>
    </form>
  );
}

export default FilterSearch;
