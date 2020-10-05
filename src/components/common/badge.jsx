import React from 'react'
import Badge from 'react-bootstrap/Badge'

function BadgeItem ({ item, selectedItem, onItemSelect }) {
  const classes = (selectedItem && selectedItem.id === item.id) ? 'primary' : 'secondary'
  return (
    <Badge
      variant={classes}
      onClick={() => onItemSelect(item)}
      key={item.id}
      className='px-2 py-1 mr-1 mb-1'
      style={{ cursor: 'pointer' }}
    >
      {item.title}
    </Badge>
  )
}

export default BadgeItem
