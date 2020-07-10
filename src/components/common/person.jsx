import React from "react";

function Person(props) {
  const { person } = props;
  return (
    <div className="card mb-4" style={{ width: "15rem" }}>
      <img
        className="card-img-top"
        style={{ height: "15rem" }}
        src={person.pic}
        alt=""
      />
      <div className="card-body">
        <h5 className="card-title">{person.name}</h5>
        <p className="card-text">{person.description}</p>
      </div>
    </div>
  );
}

export default Person;
