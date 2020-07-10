import React from "react";

const Input = ({ name, label, error, helpText, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}

      {helpText && (
        <small id="emailHelp" className="form-text text-muted">
          {helpText}
        </small>
      )}
    </div>
  );
};

export default Input;
