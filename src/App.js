import React, { useContext, useState } from "react";
import NavBar from "./components/navBar";
import { Route, Redirect, Switch } from "react-router-dom";
import EventComponent from "./components/event";
import Conference from "./components/conference";
import AddUrlForm from "./components/addUrlForm";
import UrlContext from "./context/urlContext";

function App() {
  const [url, setUrl] = useState();
  const [conferenceUrl, setConferenceUrl] = useState();
  const [eventUrl, setEventUrl] = useState();
  const [speakerUrl, setSpeakerUrl] = useState();
  const [organizerUrl, setOrganizerUrl] = useState();
  const [tagUrl, setTagUrl] = useState();
  const [themeUrl, setThemeUrl] = useState();
  const [locationUrl, setLocationUrl] = useState();
  const [sponsorUrl, setSponsorUrl] = useState();
  debugger;
  const store = {
    baseUrl: { get: url, set: setUrl },
    conference: { get: conferenceUrl, set: setConferenceUrl },
    event: { get: eventUrl, set: setEventUrl },
    speaker: { get: speakerUrl, set: setSpeakerUrl },
    organizer: { get: organizerUrl, set: setOrganizerUrl },
    tag: { get: tagUrl, set: setTagUrl },
    theme: { get: themeUrl, set: setThemeUrl },
    location: { get: locationUrl, set: setLocationUrl },
    sponsor: { get: sponsorUrl, set: setSponsorUrl },
  };
  return (
    <>
      <NavBar></NavBar>
      <main className="container">
        <UrlContext.Provider value={store}>
          <Switch>
            <Route path="/url" component={AddUrlForm}></Route>
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
