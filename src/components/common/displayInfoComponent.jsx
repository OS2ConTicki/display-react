import React from "react";


function DisplayInfoComponent(props) {

    const { item } = props;
    return (
      <div className="row d-flex justify-content-center mt-5 mb-3">
        <h1>{item.title}</h1>
        <img
          className="card-img-top"
          style={{ height: "15rem" }}
          src={item.imageUrl}
          alt=""
        />
        <p className="text-center">{item.description}</p>
        <p className="text-center">Billeter kan købes her: {item.ticketUrl}</p>
      </div>
    );
  }

export default DisplayInfoComponent;
