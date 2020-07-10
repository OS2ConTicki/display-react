import React from 'react';

const Select = ({
  name, label, options, error, ...rest
}) => {
  const lowerCaseLabel = label.toString().toLowerCase();
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        value={options[name]}
        className="form-control"
        id={name}
        name={name}
        {...rest}
      >
        <option value="">
          Vælg en
          {lowerCaseLabel}
        </option>
        {options.map((option) => (
          <option value={option.id} key={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
