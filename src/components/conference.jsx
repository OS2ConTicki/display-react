import React, { useContext, useEffect, useState } from "react";
import Events from "./events";
import Speakers from "./speakers";
import ConferenceInfo from "./conferenceInfo";
import Program from "./program";
import urlContext from "../context/urlContext";

function Conference(props) {
  const context = useContext(urlContext);
  const fetchOptions = { headers: { accept: "application/json" } };

  const fetchData = (url, which) => {
    fetch(url, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        if (context.conference.get !== null) {
          switch (which) {
            case "events":
              let events = [];
              data.data.forEach((event) => {
                event.attributes.liked =
                  localStorage.getItem(event.id) === "true";
                event.attributes.id = event.id;
                event.attributes.from = event.attributes.start_time.substring(
                  11,
                  16
                );
                event.attributes.to = event.attributes.end_time.substring(
                  11,
                  16
                );
                event.attributes.startDate = event.attributes.start_time.substring(
                  0,
                  10
                );
                event.attributes.endDate = event.attributes.end_time.substring(
                  0,
                  10
                );

                let tagIds = [];
                if (event.relationships.tags.data) {
                  event.relationships.tags.data.forEach((tag) => {
                    tagIds.push(tag.id);
                  });
                }
                event.attributes.tags = tagIds;
                event.attributes.theme = "";
                // event.attributes.description = event.attributes.description
                //   ? event.attributes.description
                //   : "";
                if (event.relationships.themes.data) {
                  event.attributes.theme = event.relationships.themes.data.id;
                }

                event = event.attributes;

                events.push(event);
              });
              context.events.set(events);
              break;
            case "tags":
              let saveTags = [];
              data.data.forEach((tag) => {
                saveTags.push({ id: tag.id, title: tag.attributes.title });
              });
              context.tags.set(saveTags);
              break;
            case "themes":
              let saveThemes = [];
              data.data.forEach((theme) => {
                saveThemes.push({
                  id: theme.id,
                  title: theme.attributes.title,
                });
              });
              context.themes.set(saveThemes);
              break;
          }
        }
      });
  };

  useEffect(() => {
    fetch(context.url.get, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        context.conference.set(data.data);
        const eventsUrl = data?.data?.links?.event?.href;
        const tagsUrl = data?.data?.links?.tag?.href;
        const themesUrl = data?.data?.links?.theme?.href;
        if (eventsUrl) {
          fetchData(eventsUrl, "events");
        }
        if (tagsUrl) {
          fetchData(tagsUrl, "tags");
        }
        if (themesUrl) {
          fetchData(themesUrl, "themes");
        }
      });
  }, []);

  return (
    <>
      <div>
        {context.conference.get && context.tags.get && context.themes.get && (
          <ConferenceInfo />
        )}
        {/* <Events /> */}
        {context.events.get && context.tags.get && context.themes.get && (
          <Program
            eventsList={context.events.get}
            tagsList={context.tags.get}
            themesList={context.themes.get}
          />
        )}
        <Speakers />
      </div>
    </>
  );
}

export default Conference;
