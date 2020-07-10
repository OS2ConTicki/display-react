import React from "react";

function Tag(props) {
  const { tag, selected } = props;
  let classes = "badge badge-secondary m-1";
  if (selected) {
    classes += " badge-primary";
  }

  return (
    <span className={classes} key={tag.id}>
      {tag.name}
    </span>
  );
}

export default Tag;
