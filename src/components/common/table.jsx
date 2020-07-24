import React from 'react'
import TableHeader from './tableHeader'
import TableBody from './tableBody'
const Table = ({ columns, onSort, sortColumn, items, label }) => {
  return (
    <table className='table'>
      <TableHeader columns={columns} label={label} />
      <TableBody columns={columns} items={items} />
    </table>
  )
}

export default Table
