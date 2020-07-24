import React, { useContext, useState, useEffect } from "react";
import DisplayInfoComponent from "./common/displayInfoComponent";
import AppStateContext from "../context/appStateContext";
function ConferenceInfo() {
  const context = useContext(AppStateContext);
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
