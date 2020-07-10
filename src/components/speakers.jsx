import React, { Component } from "react";
import { getSpeakers } from "../services/fakeConferenceService";
import Person from "./common/person";

class Speakers extends Component {
  state = {
    speakers: [],
  };

  componentDidMount() {
    this.setState({ speakers: getSpeakers() });
  }

  render() {
    const { speakers } = this.state;
    return (
      <div id="speakers" className="row d-flex justify-content-between m-3">
          {speakers.map((speaker) => (
            <Person person={speaker}></Person>
          ))}
      </div>
    );
  }
}

export default Speakers;
