import "./index.scss";

const Input = ({ onHandleChange, onHandleAddField, onHandleRemoveField }) => {
  return (
    <div className="input">
      <input
        type="text"
        className="form-control"
        onChange={onHandleChange}
        placeholder="Search here..."
      />
      <div className="button">
        <button
          type="button"
          className="btn btn-success"
          onClick={onHandleAddField}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={onHandleRemoveField}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default Input;
