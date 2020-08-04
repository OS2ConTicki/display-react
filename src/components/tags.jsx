import React from 'react'
import Tag from './common/tag'

function Tags ({ title, items, onTagSelect, valueProperty, selectedItem }) {
  return (
    <>
      <h3 className='mb-0'>{title}</h3>

      {items.map((item) => (
        <span key={item[valueProperty]}>
          <Tag
            tag={item}
            onTagSelect={onTagSelect}
            selectedTag={selectedItem.id}
          />
        </span>
      ))}
    </>
  )
}

Tags.defaultProps = {
  textProperty: 'name',
  valueProperty: 'id'
}

export default Tags
