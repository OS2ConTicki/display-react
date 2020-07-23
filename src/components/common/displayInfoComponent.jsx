import React from "react";


function DisplayInfoComponent({title, description, image, ticketUrl}) {
debugger
  return (
      <div className="row d-flex justify-content-center mt-5 mb-3">
        <h1>{title}</h1>
        {image&&
        <img
          className="card-img-top"
          style={{ height: "15rem" }}
          src={image.url}
          alt=""
        />
      }
        <p className="text-center">{description}</p>
        <p className="text-center">Billeter kan købes her: {ticketUrl}</p>
      </div>
    );
  }

export default DisplayInfoComponent;
