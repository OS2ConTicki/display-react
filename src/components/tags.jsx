import React, { Component } from "react";
import Tag from "./common/tag";

class Tags extends Component {
  render() {
    const {
      items,
      onTagSelect,
      textProperty,
      valueProperty,
      selectedItem,
    } = this.props;
    return (

      <>
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
}

Tags.defaultProps = {
  textProperty: "name",
  valueProperty: "id",
};

export default Tags;
