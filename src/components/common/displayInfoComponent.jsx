import React from "react";

function DisplayInfoComponent({ title, description, image, ticketUrl }) {
  return (
    <>
      <div className="row d-flex justify-content-center mt-5 mb-3">
        <h1>{title}</h1>
      </div>
      <div className="row d-flex justify-content-center mb-3">
        {image && (
          <img
            className="card-img-top"
            style={{ height: image.meta.height, width: image.meta.width }}
            src={image.url}
            alt={image.meta.alt || ""}
          />
        )}
      </div>
      <div className="row d-flex justify-content-center">
        <p className="text-center">{description}</p>
      </div>
      <div className="row d-flex justify-content-center">
        <p className="text-center">Billeter kan købes her: {ticketUrl}</p>
      </div>
    </>
  );
}

export default DisplayInfoComponent;
