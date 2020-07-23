import React, { useContext, useState, useEffect } from "react";
import NavBar from "./components/navBar";
import { Route, Redirect, Switch } from "react-router-dom";
import EventComponent from "./components/event";
import Conference from "./components/conference";
import AddUrlForm from "./components/addUrlForm";
import UrlContext from "./context/urlContext";

function App(props) {
  const [url, setUrl] = useState(props.url);
  const [conference, setConference] = useState();
  const [events, setEvents] = useState();
  const [tags, setTags] = useState();
  const [themes, setThemes] = useState();
  const store = {
    url: { get: url, set: setUrl },
    conference: { get: conference, set: setConference },
    events: { get: events, set: setEvents },
    tags: { get: tags, set: setTags },
    themes: { get: themes, set: setThemes },
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
