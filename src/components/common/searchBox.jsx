import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      placeholder="Søg i events"
      role="search"
      name="search"
      value={value}
      className="form-control"
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
