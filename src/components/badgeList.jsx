import React from 'react'
import Badge from './common/badge'

function BadgeList ({ title, items, onItemSelect, valueProperty, selectedItem, selectedItems }) {
  if (!selectedItems) {
    selectedItems = { [selectedItem.id]: selectedItem }
  }

  return (
    <>
      {title && <h3 className='mb-3'>{title}</h3>}
      {items.map((item) => (
        <span key={item[valueProperty]}>
          <Badge
            item={item}
            onItemSelect={onItemSelect}
            selectedItem={selectedItems[item.id]}
          />
        </span>
      ))}
    </>
  )
}

BadgeList.defaultProps = {
  textProperty: 'name',
  valueProperty: 'id'
}

export default BadgeList
