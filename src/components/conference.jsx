import React from "react";
import Events from "./events";
import Speakers from "./speakers";
import ConferenceInfo from "./conferenceInfo";

function Conference(props) {
  return (
    <>
      <ConferenceInfo></ConferenceInfo>
      <Events></Events>
      <Speakers></Speakers>
    </>
  );
}

export default Conference;
