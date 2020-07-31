import React from 'react'
import _ from 'lodash'
import Card from 'react-bootstrap/Card'

function TableBody ({ items, columns, pathProperty, valueProperty, keyProperty }) {
  function renderCell (item, column) {
    if (column.content) {
      return column.content(item)
    }
    return _.get(item, column.path)
  };

  return (
    <div className='cards'>
      {items.map((item) => (
        <Card
          key={item[valueProperty]}
          className='mb-3 bg-info'
        >

          <Card.Body className='p-0'>

            {columns.map((column) => (
              <span

                key={
                  item[valueProperty] +
                  (column[pathProperty] || column[keyProperty])
                }
              >
                {renderCell(item, column)}
              </span>
            ))}
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}

TableBody.defaultProps = {
  pathProperty: 'path',
  valueProperty: 'id',
  keyProperty: 'key'
}

export default TableBody
