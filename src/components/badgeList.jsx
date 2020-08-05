import React from 'react'
import Badge from './common/badge'

function BadgeList ({ title, items, onItemSelect, valueProperty, selectedItem }) {
  return (
    <>
      <h3 className='mb-0'>{title}</h3>

      {items.map((item) => (
        <span key={item[valueProperty]}>
          <Badge
            item={item}
            onItemSelect={onItemSelect}
            selectedItem={selectedItem.id}
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
