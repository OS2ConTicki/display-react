import React from "react";

function Tag(props) {
  const { tag, selectedTag } = props;
  let classes =
    selectedTag === tag.id
      ? "badge badge-primary m-1"
      : "badge badge-secondary m-1";

  return (
    <span className={classes} key={tag.id}>
      {tag.name}
    </span>
  );
}

export default Tag;
