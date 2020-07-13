import React, { Component } from "react";
import DisplayInfoComponent from './common/displayInfoComponent'
import {
  getConferenceInfo,
} from "../services/fetchService";

class Speakers extends Component {
  state = {
    conferenceInfo: "",
  };

  componentDidMount() {
    this.setState({
      conferenceInfo: getConferenceInfo(),
    });
  }

  render() {
    const { conferenceInfo } = this.state;
    return (
      <div id="top">
        <DisplayInfoComponent item={conferenceInfo}></DisplayInfoComponent>
      </div>
    );
  }
}

export default Speakers;
