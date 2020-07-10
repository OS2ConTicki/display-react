import React, { Component } from "react";
import { getEvent } from "../services/fakeConferenceService";
class Event extends Component {
  state = {
    event: {},
  };

  componentDidMount() {
    const eventId = this.props.match.params.id;
    this.setState({ event: getEvent(eventId) });
  }

  render() {
    const { event } = this.state;
    return (
      <React.Fragment>
        <h1>{event.title}</h1>
      </React.Fragment>
    );
  }
}

export default Event;
