import React from "react";

import { Route, Redirect, Switch } from "react-router-dom";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import EventComponent from "./components/event";
import Conference from "./components/conference";

function App() {
  return (
    <React.Fragment>
      <NavBar></NavBar>
      <main className="container">
        <Switch>
          <Route path="/konference" component={Conference}></Route>
          <Route path="/event/:id" component={EventComponent}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" to="/konference" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
