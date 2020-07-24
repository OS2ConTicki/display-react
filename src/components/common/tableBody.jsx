import React from 'react'
import _ from 'lodash'

function TableBody ({ items, columns, pathProperty, valueProperty, keyProperty }) {
  function renderCell (item, column) {
    if (column.content) {
      return column.content(item)
    }
    return _.get(item, column.path)
  };

  return (
    <tbody>
      {items.map((item) => (
        <tr key={item[valueProperty]}>
          {columns.map((column) => (
            <td
              key={
                item[valueProperty] +
                  (column[pathProperty] || column[keyProperty])
              }
            >
              {renderCell(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

TableBody.defaultProps = {
  pathProperty: 'path',
  valueProperty: 'id',
  keyProperty: 'key'
}

export default TableBody
