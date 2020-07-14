import React, { useContext } from "react";
import Events from "./events";
import Speakers from "./speakers";
import ConferenceInfo from "./conferenceInfo";
import Calendar from "./program";
import urlContext from "../context/urlContext";

function Conference(props) {
  const context = useContext(urlContext);
  return (
    <>
      {/* {context.baseUrl.get && ( */}
        <div>
          <ConferenceInfo />
          {/* <Events /> */}
          <Calendar />
          <Speakers />
        </div>
      {/* )} */}
      {/* {!context.baseUrl.get && ( */}
        <p className="mt-5">Der skal konfigureres et endpoint</p>
      {/* )} */}
    </>
  );
}

export default Conference;
