import "./index.scss";

function Dropdown({ options = [], onHandleChange }) {
  return (
    <select className="form-select" onChange={onHandleChange}>
      {options?.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
