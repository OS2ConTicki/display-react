import React, { Component } from "react";
import { getEvent } from "../services/fetchService";
import DisplayInfoComponent from "./common/displayInfoComponent";
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
    return <DisplayInfoComponent item={event}></DisplayInfoComponent>;
  }
}

export default Event;
