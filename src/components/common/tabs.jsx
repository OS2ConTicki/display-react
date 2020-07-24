import React from 'react'

function Tabs ({
  items,
  onItemSelect,
  textProperty,
  valueProperty,
  selectedItem
}) {
  return (
    <ul className='nav nav-tabs mt-4 mb-1'>
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className='nav-item'
        >
          <a className={item === selectedItem ? 'nav-link active' : 'nav-link'}>
            {item[textProperty]}
          </a>
        </li>
      ))}
    </ul>
  )
}

Tabs.defaultProps = {
  textProperty: 'name',
  valueProperty: 'id'
}

export default Tabs
