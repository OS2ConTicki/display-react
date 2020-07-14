import React, { Component } from "react";
import _ from "lodash";

class TableHeader extends Component {
  render() {
    let { label, columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.path || column.key}>{column.label || label}</th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
