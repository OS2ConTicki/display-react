import React, { Component } from "react";
import _ from 'lodash';

class SortableTableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    if (column.path !== this.props.sortColumn.path) {
      return null;
    } else if (this.props.sortColumn.order === "asc") {
      return <i className="m-1 fa fa-sort-asc"></i>;
    } else {
      return <i className="m-1 fa fa-sort-desc"></i>;
    }
  };

  render() {
    return (
      <thead>
        <tr style={{ cursor: "pointer" }}>
          {this.props.columns.map((column) => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default SortableTableHeader;
