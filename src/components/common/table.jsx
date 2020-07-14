import React from "react";
import SortableTableHeader from "./sortableTableHeader";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
const Table = ({ columns, onSort, sortColumn, items, sortable, label }) => {
  return (
    <table className="table">
      {sortable && (
        <SortableTableHeader
          columns={columns}
          onSort={onSort}
          sortColumn={sortColumn}
        ></SortableTableHeader>
      )}
      {!sortable && <TableHeader columns={columns} label={label}></TableHeader>}
      <TableBody columns={columns} items={items}></TableBody>
    </table>
  );
};

export default Table;
