import React from 'react'
import Badge from 'react-bootstrap/Badge'

function Tag (props) {
  const { tag, selectedTag, onTagSelect } = props
  const classes =
    selectedTag === tag.id
      ? 'primary'
      : 'secondary'
  return (
    <Badge
      variant={classes}
      onClick={() => onTagSelect(tag)}
      key={tag.id}
      className='px-2 py-1 mr-1'
    >
      {tag.title}
    </Badge>
  )
}

export default Tag
