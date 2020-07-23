import React, { useContext, useState, useEffect } from "react";
import NavBar from "./components/navBar";
import { Route, Redirect, Switch } from "react-router-dom";
import EventComponent from "./components/event";
import Conference from "./components/conference";
import UrlContext from "./context/urlContext";

function App(props) {
  const [conference, setConference] = useState();
  const [events, setEvents] = useState();
  const [tags, setTags] = useState();
  const [themes, setThemes] = useState();
  const [speakers, setSpeakers] = useState();
  const store = {
    conference: { get: conference, set: setConference },
    events: { get: events, set: setEvents },
    tags: { get: tags, set: setTags },
    themes: { get: themes, set: setThemes },
    speakers: { get: speakers, set: setSpeakers },
  };

  const fetchOptions = { headers: { accept: "application/json" } };

  const fetchData = (url, which) => {
    fetch(url, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        if (conference !== null) {
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
                if (event.relationships.themes.data) {
                  event.attributes.theme = event.relationships.themes.data.id;
                }

                event = event.attributes;

                events.push(event);
              });
              setEvents(events);
              break;
            case "tags":
              let saveTags = [];
              data.data.forEach((tag) => {
                saveTags.push({ id: tag.id, title: tag.attributes.title });
              });
              setTags(saveTags);
              break;
            case "themes":
              let saveThemes = [];
              data.data.forEach((theme) => {
                saveThemes.push({
                  id: theme.id,
                  title: theme.attributes.title,
                });
              });
              setThemes(saveThemes);
              break;
            case "speakers":
              let saveSpeakers = [];
              data.data.forEach((speaker) => {
                saveSpeakers.push({
                  id: speaker.id,
                  title: speaker.attributes.title,
                  description: speaker.attributes.description,
                });
              });
              setSpeakers(saveSpeakers);

              break;
          }
        }
      });
  };

  useEffect(() => {
    fetch(props.url, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        setConference(data.data);
        const eventsUrl = data?.data?.links?.event?.href;
        const tagsUrl = data?.data?.links?.tag?.href;
        const themesUrl = data?.data?.links?.theme?.href;
        const speakersUrl = data?.data?.links?.speaker?.href;
        if (eventsUrl) {
          fetchData(eventsUrl, "events");
        }
        if (eventsUrl) {
          fetchData(speakersUrl, "speakers");
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
      <NavBar></NavBar>
      <main className="container">
        <UrlContext.Provider value={store}>
          <Switch>
            <Route path="/konference" component={Conference}></Route>
            <Route path="/event/:id" component={EventComponent}></Route>
            <Redirect from="/" to="/konference" />
          </Switch>
        </UrlContext.Provider>
      </main>
    </>
  );
}

export default App;
