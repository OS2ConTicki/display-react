import React from "react";

function Tag(props) {
  const { tag, selectedTag, onTagSelect } = props;
  let classes =
    selectedTag === tag.id
      ? "badge badge-primary m-1"
      : "badge badge-secondary m-1";
  return (
    <span className={classes} onClick={() => onTagSelect(tag)} key={tag.id}>
      {tag.name}
    </span>
  );
}

export default Tag;
