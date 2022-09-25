import { useState } from "react";

import Dropdown from "./components/dropdown/Dropdown";
import Input from "./components/input/Input";

import "./index.scss";

function FilterSearch() {
  const options = [
    {
      label: "Default",
      value: "default",
    },
    {
      label: "Contains",
      value: "contains",
    },
    {
      label: "Absolute",
      value: "absolute",
    },
  ];

  const factors = [
    {
      label: "Full Name",
      value: "fullName",
    },
    {
      label: "Major",
      value: "major",
    },
    {
      label: "FPT ID",
      value: "fptId",
    },
    {
      label: "UOG ID",
      value: "uogId",
    },
    {
      label: "Person ID",
      value: "personId",
    },
    {
      label: "Gender",
      value: "gender",
    },
    {
      label: "Email",
      value: "email",
    },
  ];
  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const handleAddField = () => {
    let newField = {
      dropdown_factors: (
        <Dropdown options={factors} onHandleChange={handleChange} />
      ),
      dropdown_options: (
        <Dropdown options={options} onHandleChange={handleChange} />
      ),
      input: (
        <Input
          onHandleChange={handleChange}
          onHandleAddField={handleAddField}
          onHandleRemoveField={handleRemoveField}
        />
      ),
    };
    setFields([...fields, newField]);
  };

  const handleRemoveField = () => {};

  const [fields, setFields] = useState([
    {
      dropdown_factors: (
        <Dropdown options={factors} onHandleChange={handleChange} />
      ),
      dropdown_options: (
        <Dropdown options={options} onHandleChange={handleChange} />
      ),
      input: (
        <Input
          onHandleChange={handleChange}
          onHandleAddField={handleAddField}
          onHandleRemoveField={handleRemoveField}
        />
      ),
    },
  ]);

  return (
    <div className="filter-search">
      <ul>
        {fields.map((field, index) => (
          <li key={index}>
            {field.dropdown_factors}
            {field.dropdown_options}
            {field.input}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilterSearch;
