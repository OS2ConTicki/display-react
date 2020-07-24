import React, { useEffect, useState, useContext } from "react";
import DisplayInfoComponent from "./common/displayInfoComponent";
import AppStateContext from "../context/appStateContext";
import "../../node_modules/bootstrap/scss/bootstrap.scss";

function Event(props) {
  const context = useContext(AppStateContext);
  let [event, setEvent] = useState();
  useEffect(() => {
    const eventId = props.match.params.id;
    let events = context.events.get;
    if (events) {
      let eventToSave = _.find(events, function (event) {
        return event.id === eventId;
      });
      setEvent(eventToSave);
    }
  });
  return (
    <>
      {event && (
        <DisplayInfoComponent
          title={event.title}
          description={event.description}
          image={event.image}
          ticketUrl={event.ticketUrl}
        ></DisplayInfoComponent>
      )}
    </>
  );
}

export default Event;
