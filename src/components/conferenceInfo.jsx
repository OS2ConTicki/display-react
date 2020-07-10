import React, { Component } from "react";
import {
  getConferenceImage,
  getConferenceDescription,
  getConferenceTicketUrl,
  getConferenceTitle
} from "../services/fakeConferenceService";

class Speakers extends Component {
  state = {
    image: "",
    description: "",
    title: "",
    ticketUrl: "",
  };

  componentDidMount() {
    this.setState({
      image: getConferenceImage(),
      description: getConferenceDescription(),
      ticketUrl: getConferenceTicketUrl(),
      title: getConferenceTitle(),
    });
  }

  render() {
    const { image, description, ticketUrl, title } = this.state;
    return (
      <div className="row m-3" id="top">
        <h1>{title}</h1>
        <img
          className="card-img-top"
          style={{ height: "15rem" }}
          src={image}
          alt=""
        />
        <p>{description}</p>
        <p>{ticketUrl}</p>
      </div>
    );
  }
}

export default Speakers;
