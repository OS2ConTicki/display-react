import React, { Component } from "react";
import { getSpeakers } from "../services/fetchService";
import Person from "./common/person";

function Speakers({ speakers }) {
  return (
    <>
      <h2 className="d-flex justify-content-center mt-5 mb-3">Talere</h2>
      <div id="speakers" className="row d-flex justify-content-center">
        {speakers.map((speaker) => (
          <Person key={speaker.id} person={speaker}></Person>
        ))}
      </div>
    </>
  );
}

export default Speakers;
