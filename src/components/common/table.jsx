import React from 'react'
import TableBody from './tableBody'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Table = ({ columns, onSort, sortColumn, items, label }) => {
  return (
    <Row>
      <Col xs={12}>
        <h3>{label}</h3>
        <TableBody columns={columns} items={items} />
      </Col>
    </Row>
  )
}

export default Table
