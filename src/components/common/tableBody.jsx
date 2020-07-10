import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) {
      return column.content(item);
    }
    return _.get(item, column.path);
  };

  render() {
    const {
      items,
      columns,
      pathProperty,
      valueProperty,
      keyProperty,
    } = this.props;
    return (
      <tbody>
        {items.map((item) => (
          <tr key={item[valueProperty]}>
            {columns.map((column) => (
              <td
                key={
                  item[valueProperty]
                  + (column[pathProperty] || column[keyProperty])
                }
              >
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

TableBody.defaultProps = {
  pathProperty: 'path',
  valueProperty: 'id',
  keyProperty: 'key',
};

export default TableBody;
