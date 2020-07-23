import React, { Component } from "react";
import Tag from "./common/tag";

function Tags({ items, onTagSelect, valueProperty, selectedItem }) {
  return (
    <>
      <h3>Emner</h3>
      {items.map((item) => (
        <span key={item[valueProperty]}>
          <Tag
            tag={item}
            onTagSelect={onTagSelect}
            selectedTag={selectedItem.id}
          ></Tag>
        </span>
      ))}
    </>
  );
}

Tags.defaultProps = {
  textProperty: "name",
  valueProperty: "id",
};

export default Tags;
