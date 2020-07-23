import React, { useContext, useState, useEffect } from "react";
import DisplayInfoComponent from "./common/displayInfoComponent";
import urlContext from "../context/urlContext";
function ConferenceInfo() {
  const context = useContext(urlContext);
  const [conference, setConference] = useState();
  useEffect(() => {
    setConference(context.conference.get);
  });
  return (
    <>
      {conference && (
        <div id="top">
          <DisplayInfoComponent
            title={conference.attributes.title}
            description={conference.attributes.description}
            image={conference.attributes.image}
            ticketUrl={"www.google.com"}
          ></DisplayInfoComponent>
        </div>
      )}
    </>
  );
}

export default ConferenceInfo;
