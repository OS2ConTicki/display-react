import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";

function Like({ liked, onClick }) {
  return (
    <>
      {liked && (
        <FontAwesomeIcon
          icon={faHeartSolid}
          onClick={onClick}
          style={{ cursor: "pointer" }}
        />
      )}
      {!liked && (
        <div>
        <FontAwesomeIcon
          icon={faHeartOutline}
          onClick={onClick}
          style={{ cursor: "pointer" }}
        />
        </div>
      )}
    </>
  );
}

export default Like;
